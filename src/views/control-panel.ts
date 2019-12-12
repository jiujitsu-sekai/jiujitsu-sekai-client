import { connect } from 'pwa-helpers';
import { store } from '../redux/store';
import { LitElement, html, customElement, css, property } from 'lit-element';
import '@material/mwc-tab-bar'
import '@material/mwc-tab'
import './action-selector';
import './timeline-control';
import './camera-options';
import './animation-details';
import { setControlPanelSettings } from '../redux/actions';
import { ControlPanelTabs, Sections } from '../redux/types'

@customElement('control-panel')
export class ControlPanel extends connect(store)(LitElement) {
    render() {
      if(document.body.scrollWidth > 600) {
        return html`<control-panel-desktop></control-panel-desktop>`;
      }

      return html`<control-panel-mobile></control-panel-mobile>`;
    }
}

@customElement('control-panel-base')
export class ControlPanelBase extends connect(store)(LitElement) {
    @property({ type: Number }) displayTab = 1;
    @property({ type: Object }) currentAnimation;
    @property({ type: Number }) numTransitions = 0;
    @property({ type: Number }) numDetails = 0;
    _currentSection: string;

    stateChanged(state) {
      if(this.currentAnimation != state.currentAnimation) {
        this.currentAnimation = state.currentAnimation;
        this.numTransitions = this.currentAnimation.transitions.length;
        var d = this.currentAnimation.details;
        this.numDetails =  d ? d.length : 0;
      }

      this.displayTab = state.controlPanelSettings.selectedTab;
      if(this._currentSection != state.section) {
        this._currentSection = state.section;
        if((this.displayTab != ControlPanelTabs.TIMELINE)) {
          setControlPanelSettings({selectedTab: ControlPanelTabs.TIMELINE})
        }
      }
    }

    changeDisplayTab(tabNum: number) {
      store.dispatch(setControlPanelSettings({selectedTab: tabNum}));
    }
}

@customElement('control-panel-desktop')
export class ControlPanelDesktop extends ControlPanelBase {
    static get styles() {
      return css`
          #details-heading {
            font-family: Roboto, Sans-serif;
            margin: 10px
          }

          .half-panel {
            width: 50%
          }
        `;
    }

    render() {
        return html`
        <mwc-tab-bar activeIndex=${this.displayTab-1} style="display: flex;">
            <mwc-tab icon="transfer_within_a_station" @click=${()=>this.changeDisplayTab(1)}
                label=${this.numTransitions || ''}></mwc-tab>
            <mwc-tab icon="camera" @click=${()=>this.changeDisplayTab(2)}></mwc-tab>
        </mwc-tab-bar>
        <div style="display: ${this.displayTab == ControlPanelTabs.TIMELINE ? 'flex' : 'none'}">
            <div class='half-panel'>
              <timeline-control></timeline-control align=right>
              <action-selector></action-selector>
            </div>
            <div class='half-panel'>
              <div id='details-heading'>Details</div>
              <animation-details></animation-details>
            </div>
        </div>
        <camera-options style="display: ${this.displayTab == ControlPanelTabs.CAMERA_OPTION ? 'block' : 'none'}">
        </camera-options>
        `;
    }
}

@customElement('control-panel-mobile')
export class ControlPanelMobile extends ControlPanelBase {

    render() {
        return html`
        <mwc-tab-bar activeIndex=${this.displayTab-1} style="display: flex;">
            <mwc-tab icon="transfer_within_a_station" @click=${()=>this.changeDisplayTab(1)}
                label=${this.numTransitions || ''}></mwc-tab>
            <mwc-tab icon="camera" @click=${()=>this.changeDisplayTab(2)}></mwc-tab>
            <mwc-tab icon="format_list_bulleted" @click=${()=>this.changeDisplayTab(3)}
                label=${this.numDetails || ''}></mwc-tab>
        </mwc-tab-bar>
        <div style="display: ${this.displayTab == ControlPanelTabs.TIMELINE ? 'block' : 'none'}">
            <timeline-control></timeline-control align=right>
            <action-selector></action-selector>
        </div>
        <camera-options style="display: ${this.displayTab == ControlPanelTabs.CAMERA_OPTION ? 'block' : 'none'}">
        </camera-options>
        <animation-details style="display: ${this.displayTab == ControlPanelTabs.DETAILS ? 'block' : 'none'}">
        </animation-details>
        `;
    }
}