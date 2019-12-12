class AppStatus {
    private _appStatusElement: HTMLElement;
    private _lastUpdated: Date;

    setAppStatusElement(element: HTMLElement) {
        // This is so high speed updates to
        // the dom can be done directly. For example FPS or other high speed
        // diagnostic informaion
        // Note that app-status can still be updated using the regular redux stream
        this._appStatusElement = element;
        this._lastUpdated = new Date();
    }

    setAppStatus(status: any) {
        this._appStatusElement.innerHTML = status;
    }

    setAppStatusThrottled(status: any, throttle: number = 200) {
        if(this._lastUpdated) {
            var now = new Date();
            if((now.valueOf() - this._lastUpdated.valueOf())>throttle) {
                this.setAppStatus(status);
                this._lastUpdated = now;
            }
        }
    }
}

export var appStatus = new AppStatus();