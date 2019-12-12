import { connect } from 'pwa-helpers';
import { store } from '../redux/store';
import { LitElement, html, customElement, css, property } from 'lit-element';
import '@material/mwc-button'
import '@material/mwc-icon-button'
import { ANIMATION_CONFIG } from '../animation-config/config'
import { AnimationDetailsType, DetailAnimationTypes } from '../animation-config/types'
import { rerunAnimation, setCameraPositionAndBonesToFollow, resetCameraPositionBonesToFollow } from '../redux/actions';

@customElement('detail-breakdown')
class DetailBreakdown extends LitElement {

    static get styles() {
      return css`
      .detail-title {
      }

      #detail-title-label {
          position: relative;
          top: -5px;
          font-size: 120%;
          margin-left: 20px;
          display: inline-block;
      }

      .detail-contents {
          font-family: Roboto, Sans-serif;
          margin: 10px;
      }

      mwc-button {
        display: block;
        margin: 5px;
      }
      `
    }

    @property({ type: Object }) detail: AnimationDetailsType;
    render() {
        var ao = this.detail.animationOption;
        return html`
        <div class='detail-title'>
            <mwc-icon-button icon='arrow_back_ios' @click=${this.backClicked}></mwc-icon-button>
            <div id='detail-title-label'>${this.detail.label}</div>
            <mwc-icon-button icon='repeat_one' @click=${this.replayClicked}>
            </mwc-icon-button>
        </div>
        <div class='detail-contents'>${this.detail.ssml}</div>
        <div>${ao && ao.type == DetailAnimationTypes.REANIMATE ? html`
            <mwc-button label="Show me again" @click=${this.replayClicked}></mwc-button>
        ` : null}</div>
        `;
    }

    backClicked() {
        this.dispatchEvent(new CustomEvent('backClicked'));
    }

    replayClicked() {
        store.dispatch(rerunAnimation());
    }
}

@customElement('animation-details')
export class AnimationDetails extends connect(store)(LitElement) {
    @property({ type: Array }) details: Array<AnimationDetailsType> = [];
    @property({ type: Object }) selectedDetail: AnimationDetailsType;
    @property({ type: Boolean }) isMute: boolean;
    private _lastPlayedAudio: string;
    private _lastAudioObject: object;
    private _currentTab: number;
    private _reanimateAfterCameraAdj = false;
    

    static get styles() {
      return css`
          .scrollable {
            display: block;
            overflow-y: scroll;
            height: 120px;
          }

          mwc-button {
            display: block;
            margin: 5px;
          }
      `;
    }

    stateChanged(state) {
        this.isMute = state.mute;
        var animationId = state.currentAnimation.animationId;
        var details = ANIMATION_CONFIG.get(animationId).details || [];
        if(details != this.details) {
            this.details = details;
            this.selectedDetail = null;
        }

        if(state.controlPanelSettings.selectedTab != this._currentTab) {
            this._currentTab = state.controlPanelSettings.selectedTab;
            // Whenever we change tab, reset the camera
            this._resetCamera(false);
            this.selectedDetail = null;
        }

        // End audio if need be
        if((this.isMute || !this.selectedDetail) && this._lastAudioObject ) {
            (<any>this._lastAudioObject).pause();
            this._lastAudioObject = null;
        };

        if(this._reanimateAfterCameraAdj && !state.cameraOption.isAdjusting) {
            this._reanimateAfterCameraAdj = false;
            store.dispatch(rerunAnimation());
        }
    }

    private _resetCamera(smooth = true) {
        store.dispatch(resetCameraPositionBonesToFollow(smooth));
    }

    render() {
        if(this.selectedDetail) {
            return html`
            <detail-breakdown
                detail=${JSON.stringify(this.selectedDetail)}
                @backClicked=${()=>this.selectDetail(null)}>
            </detail-breakdown>
            `
        }
        return html`
            ${this.details.map(detail=>{
                return html`
                    <mwc-button
                        icon=${detail.icon || 'arrow_right'}
                        @click=${()=>this.selectDetail(detail)}>
                    ${detail.label}
                    </mwc-button>
                `;
            })}
        `
    }

    selectDetail(detail: AnimationDetailsType) {
        var animationId = store.getState().currentAnimation.animationId;
        this.selectedDetail = detail;

        if(detail) {
            if(detail.animationOption) {
                if(detail.animationOption.type == DetailAnimationTypes.REANIMATE) {
                    this._reanimateAfterCameraAdj = true;
                }
            }

            if(detail.cameraOption) {
                store.dispatch(setCameraPositionAndBonesToFollow(
                    detail.cameraOption.position,
                    detail.cameraOption.bonesToFollow,
                ));
            }

        }
        else {
            this._resetCamera();
        }

        if(!store.getState().mute && detail && this._lastPlayedAudio != detail.ssml) {
            setTimeout(()=>{
                var voiceId = animationId + '-' + this.selectedDetail.detailId;
                var audioPath = 'audio/voice/' + voiceId + '.mp3';
                if(this._lastAudioObject) {
                    (<any>this._lastAudioObject).pause();
                };
                var audio = new Audio(audioPath);
                audio.play();
                this._lastAudioObject = audio;
            }, 15)
        }
    }
}