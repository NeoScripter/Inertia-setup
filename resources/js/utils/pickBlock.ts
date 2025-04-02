import { BlockType, CmsBlock } from '@/types/cmsBlock';

export function pbk(blocks: BlockType, key: string) {
    return blocks[key];
}

export function cbk<K extends keyof CmsBlock>(blocks: BlockType, sectionSlug: string, sectionKey: K): boolean {
    return blocks?.[sectionSlug]?.[sectionKey] != null && blocks[sectionSlug][sectionKey] !== '';
}
