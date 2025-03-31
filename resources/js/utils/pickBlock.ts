import { BlockType } from "@/types/cmsBlock";

export function pickBlock(block: BlockType, key: string) {
    return block[key];
}
