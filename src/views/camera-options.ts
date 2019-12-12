import { connect } from 'pwa-helpers';
import { LitElement, html, customElement, css, property } from 'lit-element';
import '@material/mwc-icon-button';
import '@material/mwc-formfield';
import { cameraOptionZoomIn,
         cameraOptionZoomOut,
         setCameraFollowFighters,
         setCameraRotationSensitivity, 
         setCameraHighlightAvatar} from '../redux/actions';
import { store } from '../redux/store';

@customElement('camera-options')
export class CameraOptions extends connect(store)(LitElement) {
    @property({ type: Boolean }) followFighters: boolean;
    @property({ type: Boolean }) highlightAvatar: boolean;
    @property({ type: Number }) rotationSensitivity: number;

    static get styles() {
        return css`
            :host {
                display: flex;
                flex-direction: column;
            }

            mwc-formfield {
                display: block;
                margin: 10px;
            }

            mwc-switch {
                margin-left: 10px;
            }
        `;
    }

    stateChanged(state) {
        this.followFighters = state.cameraOption.followFighters;
        this.highlightAvatar = state.cameraOption.highlightAvatar;
        this.rotationSensitivity = state.cameraOption.rotationSensitivity;
    }

    render() {
        return html`
        <mwc-formfield alignEnd label="Zoom">
            <mwc-icon-button icon='zoom_in' @click=${this.zoomIn}></mwc-icon-button>
            <mwc-icon-button icon='zoom_out' @click=${this.zoomOut}></mwc-icon-button>
        </mwc-formfield>
        <mwc-formfield alignEnd label="Follow Fighters">
            <mwc-switch
            .checked=${this.followFighters}
            @change=${this.toggleFollowFighters}>
            </mwc-switch>
        </mwc-formfield>
        <mwc-formfield alignEnd label="Highlight Action Performer">
            <mwc-switch
            .checked=${this.highlightAvatar}
            @change=${this.toggleHighlightAvatar}>
            </mwc-switch>
        </mwc-formfield>
        <mwc-formfield alignEnd label="Rotation Sensitivity">
            <select id='rotationSensitivity' @change=${this.rotationSensitivityChanged}>
                ${[1,2,3,4,5,6,7,8,9,10].map(x=>{
                    return html`<option value=${x/10}
                        .selected=${x/10 == this.rotationSensitivity}>
                        ${x*10}%</option>`;
                })}
            </select>
        </mwc-formfield>
        `;
    }

    zoomIn() {
        store.dispatch(cameraOptionZoomIn());
    }

    zoomOut() {
        store.dispatch(cameraOptionZoomOut());
    }

    toggleFollowFighters() {
        this.followFighters = !this.followFighters;
        store.dispatch(setCameraFollowFighters(this.followFighters));
    }

    toggleHighlightAvatar() {
        this.highlightAvatar = !this.highlightAvatar;
        store.dispatch(setCameraHighlightAvatar(this.highlightAvatar));
    }

    rotationSensitivityChanged() {
        var rSense = parseFloat((<any>this.shadowRoot.getElementById('rotationSensitivity')).value);
        store.dispatch(setCameraRotationSensitivity(rSense));
    }
}
