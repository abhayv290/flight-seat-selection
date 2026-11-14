import type { LayoutConfig, LayoutId } from "../types";

export const LAYOUTS: Record<LayoutId, LayoutConfig> = {
    '3-2': {
        id: '3-2',
        label: '3 - 2',
        groups: [['A', 'B', 'C'], ['D', 'E']]
    },
    '2-3-2': {
        id: '2-3-2',
        label: '2-3-2',
        groups: [['A', 'B'], ['C', 'B', 'E'], ['F', 'G']]
    }
}

export const LAYOUT_LIST = Object.values(LAYOUTS)