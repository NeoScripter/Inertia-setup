export interface CmsBlock {
    id: number;
    page_slug: string;
    block_slug: string;

    text: string | null;
    texts: string[] | null;

    content: string | null;
    contents: string[] | null;

    image: string | null;
    images: CmsImage[];

    color: string | null;
    number: number | null;
    boolean: boolean | null;

    date: string | null;

    created_at: string;
    updated_at: string;
}

export type BlockType = Record<string, CmsBlock>;

export type CmsImage = {
    id: number;
    path: string;
    order: number;
    created_at: string;
    updated_at: string;
  }
