import { LitElement, html, customElement, property, css } from 'lit-element';
import { SearchEntry, ANIMATION_SEARCH } from '../animation-config/config'
import '@material/mwc-button'
import '@material/mwc-ripple'
import '@material/mwc-formfield'
import { store } from '../redux/store';
import {jumpToAnimation} from '../redux/actions'
import { allCapsToTitle } from './str-util'

@customElement('search-result-item')
class SearchResultItem extends LitElement {
    @property({ type: Object }) resultItem;

    static get styles() {
        return css`
        :host {
            display: block;
            border-style: none none solid none;
            border-width: 1;
        }

        .item-container {
            padding: 10px;
        }

        .heading {
            color: #333333;
        }

        .subcategory {
            font-size: 12;
            color: #666666;
        }
        `;
    }

    render() {
        return html`
            <div class='item-container' @click=${this._clickHandler}>
                <div>${this.resultItem.name}</div>
                <div class='subcategory'>${this.resultItem.subcategory}</div>
                <mwc-ripple primary></mwc-ripple>
            </div>
        `;
    }

    _clickHandler() {
        let event = new CustomEvent('itemSelected', {
            detail: {
                item: this.resultItem
            }
        });
        this.dispatchEvent(event);
    }
}

@customElement('search-result')
class SearchResult extends LitElement {
    @property({ type: Object }) result;

    static get styles() {
        return css`
        :host {
            display: block;
        }
        `;
    }

    render() {
        return html`${this.result.map(item=>{
            return html`<search-result-item
                resultItem=${JSON.stringify(item)}
                @itemSelected=${this._itemSelected}>
                </search-result-item>`
        })}
        `;
    }

    _itemSelected(event: CustomEvent) {
        var item = event.detail.item
        store.dispatch(jumpToAnimation(item.name, item.animation, item.animationRestriction));
    }
}

@customElement('search-panel')
export class SearchPanel extends LitElement {
    @property({ type: Array }) searchResult;
    @property({ type: Array }) searchTypes;
    @property({ type: String }) searchType;

    constructor() {
        super();
        this.searchTypes = Array.from(ANIMATION_SEARCH.keys()).map(searchType => {
            var label = allCapsToTitle(searchType);
            return {
                label: label,
                value: searchType
            }
        });
        this.searchType = this.searchTypes[0].value;
        this._searchKeyChanged('');
    }

    static get styles() {
        return css`
        :host {
            display: block;
        }

        select, input {
            margin-left: 5px;
            font-size: 14pt;
        }

        input {
            width: 100px;
            position: relative;
            top: -2px;
        }

        search-result {
            margin-top: 20px;
        }
        `;
    }

    render() {
        return html`
        <select id='search-type' @change=${this._searchTypeChanged}>
        ${this.searchTypes.map(searchType=>{
            return html`
            <option value="${searchType.value}">${searchType.label}</option>
            `
        })}
        </select>
        <mwc-formfield>
            <input id='search-term' type="text" @keyup=${this._inputChanged}></input>
        </mwc-formfield>
        
        <search-result result=${JSON.stringify(this.searchResult)}></search-result>
        `;
    }

    _inputChanged() {
        this._searchKeyChanged(
            this._getElementByIdAny('search-term').value);
    }
    
    _searchKeyChanged(key: string) {
        var result = <Array<SearchEntry>>Array.from(ANIMATION_SEARCH.get(this.searchType).values());
        if(key != '') {
            key = key.toLowerCase();
            result = result.filter((v: SearchEntry)=>v.name.toLowerCase().search(key) != -1);
        }

        result.sort((x ,y)=>x.name.localeCompare(y.name));

        this.searchResult = result;
    }

    _searchTypeChanged() {
        this.searchType = this._getElementByIdAny('search-type').value;
        this._getElementByIdAny('search-term').value = '';
        this._inputChanged();
    }

    _getElementByIdAny(elemId: string): any {
        return <any>this.shadowRoot.getElementById(elemId);
    }
}