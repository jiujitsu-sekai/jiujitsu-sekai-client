export const DOMAIN_ROOT = 'jiujitsu-sekai.com';
export const DOMAIN_PROD_APP = 'app.' + DOMAIN_ROOT;
export const DOMAIN_PROD_WEBSITE = 'www.' + DOMAIN_ROOT;

export interface ComponentMaterialMapType {
    name: string,
    components: Array<string>
}

export interface MeshLoadConfigType {
    name: string,
    display_name: string,
    filename: string,
    component_material_map: Array<ComponentMaterialMapType>
}

export const MESH_LOAD_CONFIG: Array<MeshLoadConfigType> = [
    {
        name: 'human',
        display_name: 'Generic Human',
        filename: 'human_mesh',
        component_material_map: [
            {
                name: 'Body',
                components: [""]
            }
        ]
    },
    {
        name: 'muay_thai_guy',
        display_name: 'Nak Muay',
        filename: 'muay_thai_guy',
        component_material_map: [
            {
                name: 'Body',
                components: [""],
            },
            {
                name: 'Hair',
                components: ["Hair"],
            },
            {
                name: 'Shorts',
                components: ["Shorts"]
            }
        ]
    }
    /*
    {
        name: 'nina',
        display_name: 'Nina',
        filename: 'female_export',
        component_material_map: [
            {
                name: 'Body',
                components: [""],
            },
            {
                name: 'Hair',
                components: ["eye_lashes_bottom_right", "eye_lashes_right", "eye_lashes_bottom_left", "eye_lashes_left", "hair"],
            },
            {
                name: 'Clothing',
                components: ["top", "bottom"]
            }
        ]
    },
    */
];