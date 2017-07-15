class DemoVR extends Demo {
constructor(

  ...

    this._togglePresent = this._togglePresent.bind(this);
    this._button = document.getElementById('vr-button');
    this._button.addEventListener('click', this._togglePresent);
    this._button.style.display = '';

  ...

) {
    super();

    this._getDisplay = this._getDisplay.bind(this);

    // If a display is connected or disconnected then we need to check that we
    // are still using a valid display
    window.addEventListener('vrdisplayconnect', this._getDisplay);
    window.addEventListener('vrdisplaydisconnect', this._getDisplay);

    this._display = null;

    this._getDisplay();
  }
  _activateVR() {
  if (this._display && !this._display.isPresenting) {
    this._display.requestPresent([{
      source: this._renderer.domElement
    }]);
  }
}

_deactivateVR() {
  if (this._display && this._display.isPresenting) {
    this._display.exitPresent();
  }
}

  // Choose the first available VR display
  _getDisplay() {
    navigator.getVRDisplays().then((displays) => {
      displays = displays.filter(display => display.capabilities.canPresent);
      if (displays.length === 0) {
        this._display = null;
      } else {
        this._display = displays[0];
      }
      console.log(`Current display: ${this._display}`);
    });
  }
}