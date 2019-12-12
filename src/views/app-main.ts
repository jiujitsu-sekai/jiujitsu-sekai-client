import { connect } from 'pwa-helpers'
import { store } from '../redux/store'
import { Sections } from '../redux/types'
import { restartAnimation, setSection, setMute } from '../redux/actions'
import { LitElement, css, html, customElement, property } from 'lit-element'
import '@material/mwc-drawer'
import { Drawer } from '@material/mwc-drawer'
import '@material/mwc-top-app-bar'
import '@material/mwc-button'
import './search-panel'
import './theme-panel'
import { appStatus } from './app-status'
import { DOMAIN_ROOT, DOMAIN_PROD_WEBSITE } from '../config'

const _SECTIONS = [
    {
        value: Sections.EXPLORE,
        icon: 'explore',
    },
    {
        value: Sections.SEARCH,
        icon: 'search',
    },
    {
        value: Sections.THEME,
        icon: 'art_track',
    },
]

interface ContentDimensionType {
    top: number
    left: number
    width: number
    height: number
}

@customElement('app-main')
export class AppMain extends connect(store)(LitElement) {
    @property({ type: String }) title: string
    @property({ type: String }) section: string
    @property({ type: Boolean }) showCanvas: boolean
    @property({ type: Object }) contentDimension: ContentDimensionType
    @property({ type: Boolean }) mute: boolean
    @property({ type: String }) appStatus: string

    constructor() {
        super()
        this._resizeContent()
        window.addEventListener('resize', this._resizeContent.bind(this))
    }

    firstUpdated() {
        appStatus.setAppStatusElement(
            this.shadowRoot.getElementById('app-status')
        )
    }

    private _resizeContent() {
        const MARGIN = 20
        const PADDING = 20
        var top = MARGIN + 55
        this.contentDimension = {
            left: MARGIN,
            top: top,
            width: screen.width - MARGIN * 2 - PADDING,
            height: screen.height - MARGIN - top - PADDING,
        }
    }

    static get styles() {
        return css`
            :host {
                font-family: Roboto, Sans-serif;
            }

            .drawer-content {
                padding: 0px 16px 0 16px;
            }

            mwc-button {
                display: block;
            }

            .overlay-panel {
                position: fixed;
                padding: 10px;
                background-color: white;
                border-style: solid;
                border-width: 1;
                opacity: 0.95;
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
                    0 6px 20px 0 rgba(0, 0, 0, 0.19);
            }

            #app-status {
                position: fixed;
                bottom: 0px;
            }
        `
    }

    stateChanged(state) {
        this.appStatus = state.appStatus
        this.title = state.title
        this.section = state.section
        console.log(this.section)
        this.mute = state.mute
    }

    render() {
        return html`
            <mwc-drawer id="drawer" hasHeader type="modal">
                <span slot="title">Menu</span>
                <div class="drawer-content">
                    ${_SECTIONS.map(section => {
                        return html`
                            <mwc-button
                                icon=${section.icon}
                                @click=${() =>
                                    this._sectionClicked(section.value)}
                            >
                                ${section.value}
                            </mwc-button>
                        `
                    })}
                    <mwc-button
                        icon="web"
                        @click=${() => this._goToPage('index.html')}
                        >Website
                    </mwc-button>
                    <mwc-button
                        icon="help"
                        @click=${() => this._goToPage('help.html')}
                        >Help
                    </mwc-button>
                    <mwc-button icon="info" @click=${this._displayVersionInfo}
                        >Version
                    </mwc-button>
                </div>
                <div slot="appContent">
                    <mwc-top-app-bar>
                        <mwc-icon-button
                            slot="navigationIcon"
                            icon="menu"
                            @click=${this._openDrawer}
                        ></mwc-icon-button>
                        <div slot="title">
                            ${this.title == '' ? this.section : this.title}
                        </div>
                        <mwc-icon-button
                            icon="search"
                            slot="actionItems"
                            @click=${() =>
                                this._sectionClicked(Sections.SEARCH)}
                        ></mwc-icon-button>
                        <mwc-icon-button
                            icon="volume_${this.mute ? 'off' : 'up'}"
                            slot="actionItems"
                            @click=${this._toggleMute}
                        ></mwc-icon-button>
                    </mwc-top-app-bar>
                    <div class="main-content">
                        <search-panel
                            class="overlay-panel"
                            style=${this._getContentStyle(
                                this.section == Sections.SEARCH,
                                this.contentDimension
                            )}
                        ></search-panel>
                        <theme-panel
                            class="overlay-panel"
                            style=${this._getContentStyle(
                                this.section == Sections.THEME,
                                this.contentDimension,
                                0.5
                            )}
                        ></theme-panel>
                    </div>
                </div>
            </mwc-drawer>
            <div id="app-status">${this.appStatus}</div>
        `
    }

    _toggleMute() {
        store.dispatch(setMute(!this.mute))
    }

    private _getContentStyle(
        visible: boolean,
        contentDimension: ContentDimensionType,
        heightScale = 1.0
    ) {
        var width = contentDimension.width
        var height = contentDimension.height * heightScale
        if (!visible) {
            width = 0
            height = 0
        }

        var top =
            contentDimension.top + (1 - heightScale) * contentDimension.height
        var res =
            'display: ' +
            (visible ? 'block' : 'none') +
            ';' +
            'top: ' +
            top +
            'px;' +
            'left: ' +
            contentDimension.left +
            'px;' +
            'width: ' +
            width +
            'px; height: ' +
            height +
            'px;'
        return res
    }

    private _getDrawer(): Drawer {
        return <Drawer>this.shadowRoot.getElementById('drawer')
    }

    _openDrawer() {
        var drawer = this._getDrawer()
        drawer.open = !drawer.open
    }

    _sectionClicked(section) {
        store.dispatch(setSection(section))
        if (section == Sections.EXPLORE) {
            store.dispatch(restartAnimation())
        }
        var drawer = this._getDrawer()
        drawer.open = false
    }

    _goToPage(page: string) {
        window.open('http://' + DOMAIN_PROD_WEBSITE + '/' + page, '_blank')
    }

    _displayVersionInfo() {
        var href = window.location.href
        var version: string
        if (href.indexOf(DOMAIN_ROOT) != -1) {
            version = href.split(DOMAIN_ROOT + '/')[1].split('/')[0]
        } else {
            version = 'dev'
        }
        alert('Version: ' + version)
    }
}
