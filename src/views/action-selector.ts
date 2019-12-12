import { connect } from 'pwa-helpers';
import { store } from '../redux/store';
import { AnimationStatus } from '../redux/types';
import { runAnimationToNextFrame, restartAnimation } from '../redux/actions';

import { LitElement, html, customElement, property, css, unsafeCSS } from 'lit-element';
import '@material/mwc-button'
import { getHighlightAvatar, NO_HIGHLIGHT_AVATAR } from '../animation-config/highlight';
import { ANIMATION_CONFIG } from '../animation-config/config';
import { getSkeletonNum } from '../animation/swap-skeletons';

@customElement('action-selector')
export class ActionSelector extends connect(store)(LitElement) {
    @property({ type: Boolean }) isAnimationRunning = false;
    @property({ type: Array }) avatarColours;


    static get styles() {
      return css`
          .scrollable {
            display: block;
            overflow-y: scroll;
          }

          @media only screen and (max-height: 600px) {
              .scrollable {
                height: 120px;
              }
          }

          mwc-button {
            display: block;
            margin: 5px;
          }
      `;
    }

    stateChanged(state) {
      this.isAnimationRunning = state.animationStatus != AnimationStatus.STOPPED;
      this.avatarColours = state.theme.avatarColours
    }

    private _playerColour(colours): string {
      if(!colours) {
        return '';
      }
      return 'rgb(' + colours[Object.keys(colours)[0]].map(x=>x*255).join(',') + ')';
    }

    render() {
      var state = store.getState();
      var transitions = state.transitions;
      if(transitions.length) {
        return html`
        <div class=scrollable>
        ${store.getState().transitions.map(action=> {
          var transition = ANIMATION_CONFIG.get(action.animationId);
          var n = getSkeletonNum(getHighlightAvatar(transition.highlightAvatar));

          // If next transition is a swap skeleton, then swap the button style
          var swapSkeletons = state.currentAnimation.swapSkeletons;
          if(swapSkeletons && swapSkeletons.indexOf(transition.animationId) != -1) {
            n = (n + 1) % 2;
          }
          return this.isAnimationRunning ? '' :
            html`<mwc-button raised style='--mdc-theme-primary: ${this._playerColour(this.avatarColours[n])}' icon=${action.icon || 'arrow_right'} @click=${()=>this.actionSelected(action)}>${action.name}</mwc-button>`
          }
        )}
        </div>
        `;
      }
      else {
        return html`<mwc-button raised @click=${this._restartAnimation}>Restart</mwc-button>`
      }
    }

    actionSelected(action: {transitions: []}) {
      store.dispatch(runAnimationToNextFrame(action));
    }

    _restartAnimation() {
      store.dispatch(restartAnimation());
    }
}