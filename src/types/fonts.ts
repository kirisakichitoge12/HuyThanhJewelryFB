export interface FontOption {
    name: string;
    value: string;
    category: "" | 'sans' | 'serif' | 'display' | 'handwriting' | 'monospace';
    weights: number[];
}