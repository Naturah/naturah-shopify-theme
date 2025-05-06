/**
 * Shopify Files API Utilities
 */
import { adminClient } from './client';

/**
 * File interface
 */
export interface ShopifyFile {
  id: string;
  url: string;
  alt?: string;
  createdAt: string;
  fileSize: number;
  fileStatus: string;
  mimeType: string;
  originalSource?: string;
}

/**
 * Create a direct upload to Shopify Files API
 */
export async function createFileUpload(
  fileName: string,
  mimeType: string,
  fileSize: number
): Promise<{ uploadUrl: string; resourceUrl: string; fileId: string } | null> {
  const mutation = `
    mutation stagedUploadsCreate($input: [StagedUploadInput!]!) {
      stagedUploadsCreate(input: $input) {
        stagedTargets {
          url
          resourceUrl
          parameters {
            name
            value
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    input: [
      {
        filename: fileName,
        mimeType: mimeType,
        fileSize: fileSize,
        resource: "FILE",
        httpMethod: "POST"
      }
    ]
  };

  try {
    const result = await adminClient.request({
      method: 'POST',
      path: 'graphql',
      data: { query: mutation, variables },
    });

    if (result?.body?.data?.stagedUploadsCreate?.userErrors?.length > 0) {
      console.error('File upload creation errors:', result.body.data.stagedUploadsCreate.userErrors);
      return null;
    }

    const stagedTarget = result?.body?.data?.stagedUploadsCreate?.stagedTargets[0];
    if (!stagedTarget) {
      return null;
    }

    // Extract file ID from the resource URL
    const resourceUrl = stagedTarget.resourceUrl;
    const fileId = resourceUrl.substring(resourceUrl.lastIndexOf('/') + 1);

    return {
      uploadUrl: stagedTarget.url,
      resourceUrl: stagedTarget.resourceUrl,
      fileId: fileId
    };
  } catch (error) {
    console.error('Error creating file upload:', error);
    return null;
  }
}

/**
 * Upload a file to the generated upload URL
 */
export async function uploadFileToShopify(
  uploadUrl: string,
  parameters: { name: string; value: string }[],
  file: File
): Promise<boolean> {
  try {
    const formData = new FormData();
    
    // Add all the required parameters to the form data
    parameters.forEach(param => {
      formData.append(param.name, param.value);
    });
    
    // Add the file as the last field
    formData.append('file', file);

    const response = await fetch(uploadUrl, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      console.error('Upload failed:', await response.text());
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error uploading file:', error);
    return false;
  }
}

/**
 * Get file details from Shopify
 */
export async function getFileDetails(fileId: string): Promise<ShopifyFile | null> {
  const query = `
    query {
      node(id: "${fileId}") {
        ... on GenericFile {
          id
          url
          alt
          createdAt
          fileStatus
          fileSize
          mimeType
          originalSource
        }
      }
    }
  `;

  try {
    const result = await adminClient.request({
      method: 'POST',
      path: 'graphql',
      data: { query },
    });

    const file = result?.body?.data?.node;
    if (!file) {
      return null;
    }

    return {
      id: file.id,
      url: file.url,
      alt: file.alt,
      createdAt: file.createdAt,
      fileSize: file.fileSize,
      fileStatus: file.fileStatus,
      mimeType: file.mimeType,
      originalSource: file.originalSource,
    };
  } catch (error) {
    console.error('Error getting file details:', error);
    return null;
  }
}

/**
 * Update file metadata
 */
export async function updateFileMetadata(
  fileId: string, 
  metadata: { 
    alt?: string;
    customerId?: string;
    description?: string;
    title?: string;
    tags?: string[];
  }
): Promise<ShopifyFile | null> {
  const mutation = `
    mutation fileUpdate($input: GenericFileUpdateInput!) {
      fileUpdate(input: $input) {
        file {
          id
          url
          alt
          createdAt
          fileStatus
          fileSize
          mimeType
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    input: {
      id: fileId,
      alt: metadata.alt,
      metafields: [
        metadata.title && {
          key: "title",
          namespace: "custom",
          value: metadata.title,
          type: "single_line_text_field"
        },
        metadata.description && {
          key: "description", 
          namespace: "custom",
          value: metadata.description,
          type: "multi_line_text_field"
        },
        metadata.customerId && {
          key: "customer_id",
          namespace: "custom",
          value: metadata.customerId,
          type: "single_line_text_field"
        },
        metadata.tags && {
          key: "tags",
          namespace: "custom",
          value: JSON.stringify(metadata.tags),
          type: "json"
        }
      ].filter(Boolean)
    }
  };

  try {
    const result = await adminClient.request({
      method: 'POST',
      path: 'graphql',
      data: { query: mutation, variables },
    });

    if (result?.body?.data?.fileUpdate?.userErrors?.length > 0) {
      console.error('File update errors:', result.body.data.fileUpdate.userErrors);
      return null;
    }

    const file = result?.body?.data?.fileUpdate?.file;
    if (!file) {
      return null;
    }

    return {
      id: file.id,
      url: file.url,
      alt: file.alt,
      createdAt: file.createdAt,
      fileSize: file.fileSize,
      fileStatus: file.fileStatus,
      mimeType: file.mimeType,
    };
  } catch (error) {
    console.error('Error updating file metadata:', error);
    return null;
  }
}

/**
 * List files with metadata (supports filtering by customer ID)
 */
export async function listFiles(
  options: {
    first?: number;
    customerId?: string;
    tags?: string[];
  } = {}
): Promise<ShopifyFile[]> {
  const { first = 20, customerId, tags } = options;
  
  let metafieldFilters = '';
  
  if (customerId) {
    metafieldFilters += `
      metafield: {
        namespace: "custom",
        key: "customer_id",
        value: "${customerId}"
      }
    `;
  }

  // Add tag filtering if provided
  // Note: This is simplified; actual implementation might need more complex filtering
  
  const query = `
    query {
      files(first: ${first}${metafieldFilters ? `, query: "${metafieldFilters}"` : ''}) {
        edges {
          node {
            id
            url
            alt
            createdAt
            fileStatus
            fileSize
            mimeType
            originalSource
          }
        }
      }
    }
  `;

  try {
    const result = await adminClient.request({
      method: 'POST',
      path: 'graphql',
      data: { query },
    });

    const files = result?.body?.data?.files?.edges || [];
    
    return files.map((edge: any) => ({
      id: edge.node.id,
      url: edge.node.url,
      alt: edge.node.alt,
      createdAt: edge.node.createdAt,
      fileSize: edge.node.fileSize,
      fileStatus: edge.node.fileStatus,
      mimeType: edge.node.mimeType,
      originalSource: edge.node.originalSource,
    }));
  } catch (error) {
    console.error('Error listing files:', error);
    return [];
  }
}

/**
 * Delete a file
 */
export async function deleteFile(fileId: string): Promise<boolean> {
  const mutation = `
    mutation fileDelete($input: FileDeleteInput!) {
      fileDelete(input: $input) {
        deletedFileId
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    input: {
      fileId
    }
  };

  try {
    const result = await adminClient.request({
      method: 'POST',
      path: 'graphql',
      data: { query: mutation, variables },
    });

    if (result?.body?.data?.fileDelete?.userErrors?.length > 0) {
      console.error('File deletion errors:', result.body.data.fileDelete.userErrors);
      return false;
    }

    return !!result?.body?.data?.fileDelete?.deletedFileId;
  } catch (error) {
    console.error('Error deleting file:', error);
    return false;
  }
} 