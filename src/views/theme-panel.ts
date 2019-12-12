import { connect } from 'pwa-helpers';
import { LitElement, html, customElement, property, css } from 'lit-element';
import '@material/mwc-tab-bar'
import '@material/mwc-tab'
import '@material/mwc-formfield'
import '@material/mwc-switch'
import { store } from '../redux/store';
import { FloorTypes } from '../redux/types';
import { setAvatar, setAvatarColour, setFloorColour, setBackgroundColour, setEnableReflection, setEnableShadow, setSkyBox, setFloorTexture } from '../redux/actions';
import { MESH_LOAD_CONFIG } from '../config'

const BackgroundTypes = [
    {
        value: 'SKY',
        label: 'Sky',
        isSkyBox: true,
        skyBoxName: 'skybox'
    },
    {
        value: 'CITY',
        label: 'City',
        isSkyBox: true,
        skyBoxName: 'skybox2'
    },
    {
        value: 'SNOW1',
        label: 'Snow1',
        isSkyBox: true,
        skyBoxName: 'skybox3'
    },
    {
        value: 'SNOW2',
        label: 'Snow2',
        isSkyBox: true,
        skyBoxName: 'skybox4'
    },
    {
        value: 'TRIPICAL_SUNNY_DAY',
        label: 'Tripcal Sunny Day',
        isSkyBox: true,
        skyBoxName: 'TropicalSunnyDay'
    },
    {
        value: 'PLAIN',
        label: 'Plain',
        isSkyBox: false
    },
];


const FloorTextures = [
    {
        type: FloorTypes.PLAIN,
        label: 'Plain',
    },
    {
        type: FloorTypes.TEXTURE,
        label: 'Grass',
        textureName: 'grass.jpg'
    },
    {
        type: FloorTypes.TEXTURE,
        label: 'Tatami',
        textureName: 'tatami.jpg'
    },
    {
        type: FloorTypes.TEXTURE,
        label: 'Stone',
        textureName: 'stones.png'
    },
    {
        type: FloorTypes.TEXTURE,
        label: 'Stone 2',
        textureName: 'stones2.jpg'
    },
    {
        type: FloorTypes.TEXTURE,
        label: 'Sand',
        textureName: 'sand.jpg'
    },
    {
        type: FloorTypes.TEXTURE,
        label: 'Snow',
        textureName: 'snow.jpg'
    },
    {
        type: FloorTypes.TEXTURE,
        label: 'Carpet',
        textureName: 'carpet.jpg'
    }
    /*
    {
        value: FloorTypes.NONE,
        label: 'None',
    },
    */
]

function componentToHex(c) {
    var hex = Math.floor((c * 255)).toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
        parseInt(result[1], 16) / 255,
        parseInt(result[2], 16) / 255,
        parseInt(result[3], 16) / 255
    ] : null;
}

@customElement('fighter-style') 
class FighterStyle extends connect(store)(LitElement) {
    @property({ type: Number }) fighter;
    @property({ type: String }) avatarName;
    @property({ type: Object }) avatar;
    @property({ type: Array }) components = [];
    @property({ type: Object }) avatarColoursRgb = {};
    @property({ type: Object }) avatarColoursHex = {};

    stateChanged(state) {
        this._handleAvatarChanged(state);
        this._handleAvatarColoursChanged(state);
    }

    private _handleAvatarChanged(state) {
        var avatarName = state.theme.avatars[this.fighter];
        if(avatarName != this.avatarName) {
            this.avatarName = avatarName;
            this.avatar = MESH_LOAD_CONFIG.find(x=>x.name == avatarName);
            this.components = this.avatar.component_material_map;
        }
    }

    private _handleAvatarColoursChanged(state) {
        var avatarColoursRgb = state.theme.avatarColours[this.fighter];
        if(avatarColoursRgb && avatarColoursRgb != this.avatarColoursRgb) {
            this.avatarColoursRgb = avatarColoursRgb;
            var avatarColoursHex = Object.assign({}, this.avatarColoursHex);
            for (let key in avatarColoursRgb) {
                var [r, g, b] = avatarColoursRgb[key];
                avatarColoursHex[key] = rgbToHex(r, g, b);
            }
            this.avatarColoursHex = avatarColoursHex;
        }
    }

    static get styles() {
        return css`
            :host {
                display: flex;
                flex-direction: column;
            }

            mwc-formfield {
                margin: 5px;
            }
        `;
    }

    render() {
        return html`
        <mwc-formfield alignEnd label="Mesh">
            <select id='fighterMesh' @change=${this.meshChanged}>
            ${MESH_LOAD_CONFIG.map(config=>{
                return html`<option value=${config.name}>${config.display_name}</option>`
            })}
            </select>
        </mwc-formfield>
        ${this.components.map(component=>{
            return html`
            <mwc-formfield alignEnd label="${component.name}">
                <input type='color'
                    value=${this.avatarColoursHex[component.name]}
                    @change=${(e: Event)=>this.componentColourChanged(e, component.name)}/>
            </mwc-formfield>
            `;
        })}
        `;
    }

    meshChanged() {
        var mesh = (<any>this.shadowRoot.getElementById('fighterMesh')).value;
        store.dispatch(setAvatar(this.fighter, mesh));
    }

    componentColourChanged(event: any, component: string) {
        var colourHex = event.path[0].value;

        if(this.avatarColoursHex[component] != colourHex) {
            this.avatarColoursHex[component] = colourHex;
            var colourRgb = hexToRgb(colourHex);
            this.avatarColoursRgb[component] = colourRgb;
            var colours = Object.assign({}, this.avatarColoursRgb);
            colours[component] = colourRgb;
            store.dispatch(setAvatarColour(this.fighter, colours));
        }
    }

}

@customElement('background-style') 
class BackgroundStyle extends connect(store)(LitElement) {
    @property({ type: Object }) floorColourRgb = [];
    @property({ type: Object }) floorColourHex = '';
    @property({ type: Object }) backgroundColourRgb = [];
    @property({ type: Object }) backgroundColourHex = '';
    @property({ type: Boolean }) enableShadow;
    @property({ type: Boolean }) enableReflection;
    @property({ type: String }) skyBoxName;
    @property({ type: String }) floorTexture;

    static get styles() {
        return css`
            :host {
                display: flex;
                flex-direction: column;
            }

            mwc-formfield {
                margin: 5px;
            }

            mwc-switch {
                margin-left: 10px;
            }
        `;
    }

    stateChanged(state) {
        ['background', 'floor'].forEach(component=>{
            var rgbName = component + 'ColourRgb';
            var hexName = component + 'ColourHex';
            var colourRgb = state.theme[component + 'Colour'];
            if(colourRgb && colourRgb != this[rgbName]) {
                this[rgbName] = colourRgb;
                var [r, g, b] = colourRgb;
                this[hexName] = rgbToHex(r, g, b);
            }
        })

        var theme = state.theme;
        this.enableShadow = theme.enableShadow;
        this.enableReflection = theme.enableReflection;
        this.skyBoxName = theme.skyBoxName;
        this.floorTexture = theme.floorTexture;
    }

    render() {
        return html`
        <mwc-formfield alignEnd label="Background">
            <div>
            <select id='bgTypeSelect' @change=${this.backgroundTypeChanged}>
                ${BackgroundTypes.map(bgType=>{
                    if(bgType.skyBoxName == this.skyBoxName) {
                        return html`<option value=${bgType.value} selected>${bgType.label} </option>`;
                    }
                    return html`<option value=${bgType.value} >${bgType.label} </option>`;
                })}
            </select>
            <input type='color'
                value=${this.backgroundColourHex}
                @change=${(e)=>this.colourChanged(e, 'background', setBackgroundColour)}
                style='display: ${this.skyBoxName ? 'none' : 'inline-block'}'
                />
            </div>
        </mwc-formfield>
        <mwc-formfield alignEnd label="Floor">
            <select id='floorTextureSelect' @change=${this.floorTextureChanged}>
                ${FloorTextures.map(floorType=>{
                    if(this.floorTexture == floorType.textureName) {
                        return html`<option value=${floorType.textureName} selected>${floorType.label} </option>`;
                    }
                    return html`<option value=${floorType.textureName}>${floorType.label} </option>`;
                })}
            </select>
            <div style='display: ${this.floorTexture == 'undefined' ? 'inline-block' : 'none'}'>
                <input type='color'
                    value=${this.floorColourHex}
                    @change=${(e)=>this.colourChanged(e, 'floor', setFloorColour)}/>
            </select>
            </div>
        </mwc-formfield>
        <mwc-formfield alignEnd label="Reflection">
            <mwc-switch
            .checked=${this.enableReflection}
            @change=${(e)=>this.setEffectEnabled(e, 'Reflection', setEnableReflection)}>
            </mwc-switch>
        </mwc-formfield>
        <mwc-formfield alignEnd label="Shadow">
            <mwc-switch
            .checked=${this.enableShadow}
            @change=${(e)=>this.setEffectEnabled(e, 'Shadow', setEnableShadow)}>
            </mwc-switch>
        </mwc-formfield>
        `;
    }

    backgroundTypeChanged() {
        var bgTypeName = (<any>this.shadowRoot.getElementById('bgTypeSelect')).value;
        var bgType = BackgroundTypes.find(x=>x.value == bgTypeName);
        if(this.skyBoxName != bgType.skyBoxName) {
            this.skyBoxName = bgType.skyBoxName;
            store.dispatch(setSkyBox(bgType.skyBoxName))
        }
    }

    floorTextureChanged() {
        var textureName = (<any>this.shadowRoot.getElementById('floorTextureSelect')).value;
        store.dispatch(setFloorTexture(textureName));
    }

    floorOpacityChanged() {
        /*
        var opacity = (<any>this.shadowRoot.getElementById('floorOpacitySelect')).value;
        console.log(opacity);

        if(this.floorOpacity != opacity) {
            this.floorOpacity = opacity;
            this.floorTexture = texture;
            store.dispatch(setFloorTexture(texture))
        }
        */
    }

    colourChanged(event, component: string, action: (object)=>any) {
        var hexName = component + 'ColourHex';
        var rgbName = component + 'ColourRgb';
        var colourHex = event.path[0].value;

        if(this[hexName] != colourHex) {
            this[hexName] = colourHex;
            var colourRgb = hexToRgb(colourHex);
            this[rgbName] = colourRgb;
            store.dispatch(action(colourRgb));
        }
    }

    setEffectEnabled(event, effect: string, action: (object)=>any) {
        var enabled = event.path[0].checked;
        var propName = 'enable' + effect;
        if(this[propName] != enabled) {
            this[propName] = enabled;
            store.dispatch(action(enabled));
        }
    }

}

@customElement('theme-panel')
class SettingPanel extends LitElement {
    @property({ type: Number }) displayTab = 1;

    static get styles() {
        return css`
            #theme-contents {
                padding: 10px;
            }
        `;
    }

    render() {
        return html`
        <mwc-tab-bar activetab="1" style="display: flex;">
            <mwc-tab icon="perm_media" @click=${()=>this.displayTab = 1}></mwc-tab>
            <mwc-tab icon="accessibility" label="1" @click=${()=>this.displayTab = 2}></mwc-tab>
            <mwc-tab icon="accessibility" label="2" @click=${()=>this.displayTab = 3}></mwc-tab>
        </mwc-tab-bar>
        <div id="theme-contents">
            <div style="display: ${this.displayTab == 1 ? 'block' : 'none'}">
                <background-style></background-style>
            </div>
            <div style="display: ${this.displayTab == 2 ? 'block' : 'none'}">
                <fighter-style fighter=0></fighter-style>
            </div>
            <div style="display: ${this.displayTab == 3 ? 'block' : 'none'}">
                <fighter-style fighter=1></fighter-style>
            </div>
        </div>
        `;
    }
}

