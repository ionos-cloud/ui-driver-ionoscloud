/*!!!!!!!!!!!Do not change anything between here (the DRIVERNAME placeholder will be automatically replaced at buildtime)!!!!!!!!!!!*/
import NodeDriver from 'shared/mixins/node-driver';

// do not remove LAYOUT, it is replaced at build time with a base64 representation of the template of the hbs template
// we do this to avoid converting template to a js file that returns a string and the cors issues that would come along with that
const LAYOUT;
/*!!!!!!!!!!!DO NOT CHANGE END!!!!!!!!!!!*/


/*!!!!!!!!!!!GLOBAL CONST START!!!!!!!!!!!*/
// EMBER API Access - if you need access to any of the Ember API's add them here in the same manner rather then import them via modules, since the dependencies exist in rancher we dont want to expor the modules in the amd def
const computed     = Ember.computed;
const get          = Ember.get;
const set          = Ember.set;
const alias        = Ember.computed.alias;
const service      = Ember.inject.service;

const defaultRadix = 10;
const defaultBase  = 1024;
/*!!!!!!!!!!!GLOBAL CONST END!!!!!!!!!!!*/



/*!!!!!!!!!!!DO NOT CHANGE START!!!!!!!!!!!*/
export default Ember.Component.extend(NodeDriver, {
  driverName: '%%DRIVERNAME%%',
  config:     alias('model.%%DRIVERNAME%%Config'),
  app:        service(),

  init() {
    // This does on the fly template compiling, if you mess with this :cry:
    const decodedLayout = window.atob(LAYOUT);
    const template      = Ember.HTMLBars.compile(decodedLayout, {
      moduleName: 'nodes/components/driver-%%DRIVERNAME%%/template'
    });
    set(this,'layout', template);

    this._super(...arguments);
  },
  /*!!!!!!!!!!!DO NOT CHANGE END!!!!!!!!!!!*/

  actions: {
    // Sets `config.natLansToGateways` to a map of LANs to Gateways interpretable by Docker Machine Driver: like 1=[10.0.0.1,10.0.0.2];2=[10.0.0.10]
    updateNatLansToGatewaysMap() {
      // Replace function with this commented line, if you want to include empty gateway IP fields
      // this.config.natLansToGateways = this.config.lans.map(lan => `${lan.id}=[${lan.gatewayIps.join(',')}]`).join(';');
      this.config.natLansToGateways = "";
      let validIndex = 0;
      this.config.lans.forEach((lan, index) => {
        let validIps = lan.gatewayIps.filter(ip => ip.trim() !== "");
        if (validIps.length) {
          this.config.natLansToGateways += `${lan.id}=[${validIps.join(',')}]`;
          validIndex += 1;
          // Only separate the LANs by ; if it's the not last one in the array
          if (index !== this.config.lans.length - 1 && this.config.lans[index + 1].gatewayIps.filter(ip => ip.trim() !== "").length) {
            this.config.natLansToGateways += ';';
          }
        }
      });
      console.log("natLansToGateways = " + this.config.natLansToGateways);
    },

    addGatewayIp(lan) {
      lan.gatewayIps.pushObject('');
      this.send('updateNatLansToGatewaysMap');
    },

    deleteGatewayIp(lan, index) {
      lan.gatewayIps.removeAt(index);
      this.send('updateNatLansToGatewaysMap');
    },

    addLan(lanId) {
      lanId = parseInt(lanId);
      if (isNaN(lanId)) {
        alert('Please enter a valid integer for the LAN ID');
        return;
      }

      this.config.lans.pushObject({
        id: lanId,
        gatewayIps: [""],
      });
      this.send('updateNatLansToGatewaysMap');
    },

    deleteLan(lan) {
      this.config.lans.removeObject(lan);
      this.send('updateNatLansToGatewaysMap');
    },

    addPublicIp() {
      this.config.natPublicIps.pushObject('');
    },

    // deletePublicIp() {
    //   this.config.natPublicIps.removeAt(this.config.natPublicIps.length - 1);
    // },
  },

  // Write your component here, starting with setting 'model' to a machine with your config populated
  bootstrap: function() {
    // bootstrap is called by rancher ui on 'init', you're better off doing your setup here rather then the init function to ensure everything is setup correctly
    let config = get(this, 'globalStore').createRecord({
      type: '%%DRIVERNAME%%Config',
      cores: 2,
      ram: 2048,
      userData: '',
      token: '',
      username: '',
      password: '',
      endpoint: 'https://api.ionos.com/cloudapi/v6',
      serverType: 'ENTERPRISE',
    });

    set(this, 'model.%%DRIVERNAME%%Config', config);
  },

  // Add custom validation beyond what can be done from the config API schema
  validate() {
    // Get generic API validation errors
    this._super();
    var errors = get(this, 'errors')||[];
    if ( !get(this, 'model.name') ) {
      errors.push('Name is required');
    }

    // Add more specific errors

    // Check something and add an error entry if it fails:
    if ( parseInt(get(this, 'config.memorySize'), defaultRadix) < defaultBase ) {
      errors.push('Memory Size must be at least 1024 MB');
    }

    // Set the array of errors for display,
    // and return true if saving should continue.
    if ( get(errors, 'length') ) {
      set(this, 'errors', errors);
      return false;
    } else {
      set(this, 'errors', null);
      return true;
    }
  },

  // Any computed properties or custom logic can go here
  // duplicated dict k/v pairs in favor of cleaner hbs template - be my guest if you want to change this
  zoneOptions: [
    {
      name: 'AUTO',
      value: 'AUTO',
    },
    {
      name: 'ZONE_1',
      value: 'ZONE_1',
    },
    {
      name: 'ZONE_2',
      value: 'ZONE_2',
    },
    {
      name: 'ZONE_3',
      value: 'ZONE_3',
    },
  ],

  // TODO: Should restrict CPU locations based on the location chosen
  // TODO: Should be restricted by DatacenterID to the Datacenter's location, if set
  locationOptions: [
    {
      name: 'Las Vegas, USA',
      value: 'us/las',
    },
    {
      name: 'Newark, USA',
      value: 'us/ewr',
    },
    {
      name: 'Frankfurt, Germany',
      value: 'de/fra',
    },
    {
      name: 'Berlin, Germany',
      value: 'de/txl',
    },
    {
      name: 'London, UK',
      value: 'gb/lhr',
    },
    {
      name: 'Logroño, Spain',
      value: 'es/vit',
    },
    {
      name: 'Paris, France',
      value: 'fr/par',
    },
  ],

  // Do you have a better option? Open a PR or an issue!
  // TODO: Should be restricted by LocationOptions.

  serverTypeOptions: [
    {
      name: 'Enterprise',
      value: 'ENTERPRISE',
    },
    {
      name: 'Cube',
      value: 'CUBE',
    },
  ],

  cubeServerTemplateOptions: [
    {
      name: 'XS',
      value: 'CUBES XS',
    },
    {
      name: 'S',
      value: 'CUBES S',
    },
    {
      name: 'M',
      value: 'CUBES M',
    },
    {
      name: 'L',
      value: 'CUBES L',
    },
    {
      name: 'XL',
      value: 'CUBES XL',
    },
    {
      name: 'XXL',
      value: 'CUBES XXL',
    },
    {
      name: '3XL',
      value: 'CUBES 3XL',
    },
    {
      name: '4XL',
      value: 'CUBES 4XL',
    },
  ],

  cpuOptions: [
    {
      name: 'Intel SKYLAKE (Europe)',
      value: 'INTEL_SKYLAKE',
    },
    {
      name: 'AMD OPTERON (USA)',
      value: 'AMD_OPTERON',
    },
    {
      name: 'Intel XEON (USA)',
      value: 'INTEL_XEON',
    },
  ],

  // Do you have a better option? Open a PR or an issue!
  storageTypeOptions: [
    {
      name: 'HDD',
      value: 'HDD',
    },
    {
      name: 'SSD',
      value: 'SSD'
    },
  ]
});

