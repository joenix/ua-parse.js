/**
 * Environ
 * ======== ======== ========
 * Level:
 * 1. System
 * 2. Platform
 * 3. Engine
 * 4. Browser
 * 5. Shell
 * ======== ======== ========
 */

// Configure
import {
  system,
  systemVersion,
  engine,
  engineVersion,
  browser,
  browserVersion,
  shell,
  shellVersion,
  platform,
  compare
} from '../conf';

// Utils
import { test, match, pare, loop, smoke, result } from '../util';

// Class
class Environ {
  constructor() {
    // No Browser
    if (typeof window === 'undefined') {
      return console.log('Please run in Browser .');
    }

    // Data Resource
    this.data = {};

    // APIs
    return this;
  }

  // Get System
  getSystem() {
    // Variables
    let data = {};

    // Name
    smoke(system, key => (data.name = key));

    // Version
    data.version = match(systemVersion[data.name]);

    // Windows
    if (system.name === 'windows') {
      data.version = compare.windows[data.version];
    }

    // Result
    return result('system', data, this.data);
  }

  // Get Engine
  getEngine() {
    // Variables
    let data = {};

    // Name
    smoke(engine, (key, value) => {
      return (data.name = key), false;
    });

    // Version
    smoke(engineVersion, (key, value) => {
      return (data.version = match(value)), false;
    });

    // Result
    return result('engine', data, this.data);
  }

  // Get Browser
  getBrowser() {
    // Variables
    let data = {};

    // Support
    if (!this.data.engine) {
      this.getEngine();
    }

    // Name
    this.data.engine.name === 'webkit'
      ? // in Webkit
        smoke(browser.webkit, (key, value) => {
          return (data.name = key), false;
        })
      : // in Others
        smoke(
          browser,
          (key, value) => {
            return (data.name = key), false;
          },
          value => value
        );

    // Version
    smoke(browserVersion, (key, value) => {
      return (data.version = match(value)), false;
    });

    // Result: Merge Shell
    return result('browser', { ...data, ...this.getShell() }, this.data);
  }

  // Get Shell
  getShell() {
    // Variables
    let data = {};

    // Name
    smoke(shell, (key, value) => {
      return (data.name = key), false;
    });

    // Version
    if (shellVersion[data.name]) {
      data.version = match(shellVersion[data.name]);
    }

    // Result
    return result('shell', data, this.data);
  }

  // Get Platform
  getPlatform() {
    // Variables
    let data = {};

    // Direct
    if (match(platform.exp)) {
      return (data.name = 'mobile');
    }

    // Support
    if (!this.data.system) {
      this.getSystem();
    }

    // Name
    smoke(
      platform,
      (key, value) => (data.name = key),
      value => pare(value, this.data.system.name)
    );

    // Result
    return result('platform', data, this.data);
  }

  // Full
  get() {
    return {
      system: this.getSystem(),
      engine: this.getEngine(),
      browser: this.getBrowser(),
      shell: this.getShell(),
      platform: this.getPlatform()
    };
  }
}

export default Environ;
