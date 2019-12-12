import { connect } from 'pwa-helpers';
import { store } from '../redux/store';
import { AnimationStatus } from '../redux/types';
import {
  keepRunningAnimation,
  backToPeviousJump,
  rerunAnimation,
  rewindAnimation,
  pauseAnimation
} from '../redux/actions';

import { LitElement, html, customElement, property, css } from 'lit-element';
import '@material/mwc-icon-button'

@customElement('timeline-control')
export class TimelineControl extends connect(store)(LitElement) {
    @property({ type: Boolean }) isAnimationRunning = false;
    @property({ type: Boolean }) isInitialAnimation = false;

    static get styles() {
      return css`
      `;
    }

    stateChanged(state) {
        this.isAnimationRunning = state.animationStatus != AnimationStatus.STOPPED;
        this.isInitialAnimation = state.animationHistory.length <= 1;

        if(state.animationStatus == AnimationStatus.FRAME_ENDED) {
            if(store.getState().transitions.length > 0) {
                setTimeout(this._continueAnimation.bind(this), 15);
            }
        }
    }

    render() {
        return html`
            ${this.isAnimationRunning ?
                html`<mwc-icon-button icon="pause_circle_outline" @click=${this._pauseClicked}></mwc-icon-button>` :
                html`<mwc-icon-button icon="play_circle_outline" @click=${this._playClicked}></mwc-icon-button>`
            }
            <mwc-icon-button icon="repeat_one" @click=${this._repeatClicked}></mwc-icon-button>
            ${this.isInitialAnimation ?
                html`<mwc-icon-button icon="skip_previous" disabled></mwc-icon-button>` :
                html`<mwc-icon-button icon="skip_previous" @click=${this._rewindClicked}></mwc-icon-button>`
            }
            <mwc-icon-button icon="replay" @click=${this._restartClicked}></mwc-icon-button>
        `;
    }

    _pauseClicked() {
        store.dispatch(pauseAnimation());
    }

    _playClicked() {
        this._continueAnimation();
    }

    _continueAnimation() {
        var actions = store.getState().transitions;
        var index = Math.floor(Math.random() * actions.length);
        var action = actions[index]
        store.dispatch(keepRunningAnimation(action));
    }

    _repeatClicked() {
        store.dispatch(rerunAnimation());
    }

    _rewindClicked() {
        store.dispatch(rewindAnimation());
    }

    _restartClicked() {
        store.dispatch(backToPeviousJump());
    }
}