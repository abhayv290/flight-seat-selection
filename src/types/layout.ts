import type { LayoutConfig, LayoutId } from ".";

export const LAYOUTS: Record<LayoutId, LayoutConfig> = {
    '3-2': {
        id: '3-2',
        label: '3 - 2',
        groups: [['A', 'B', 'C'], ['D', 'C']]
    },
    '2-3-2': {
        id: '2-3-2',
        label: '2-3-2',
        groups: [['A', 'B'], ['C', 'B', 'E'], ['F', 'G']]
    }
}

export const LAYOUT_LIST = Object.values(LAYOUTS)