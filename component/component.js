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

  lans: [], // An array of objects: { "lan": "LAN_ID", "gatewayIps": [IP_1, IP_2] }, { ... }. { ... }. Unmarshalled to the string natLansToGateways which is sent to the driver.
  actions: {
    save() {
      this.set('config.natPublicIps', this.config.natPublicIps);
      this.set('config.nicIps', this.config.nicIps);

      // Sets `config.natLansToGateways` to a map of LANs to Gateways interpretable by Docker Machine Driver: like 1=10.0.0.1,10.0.0.2:2=10.0.0.10
      this.config.natLansToGateways = this.lans.map(lan => `${lan.id}=${lan.gatewayIps.join(',')}`).join(':');
      this.set('config.natLansToGateways', this.config.natLansToGateways)

      this._super(...arguments);
    },

    // Builds this.lans from the natLansToGateways marshalled string
    reverseNatLansToGatewaysMap() {
      let marshalledString = this.get('config.natLansToGateways')
      if (!marshalledString) {
        marshalledString = ""
      }
      let lans = marshalledString ? marshalledString.split(':').map(entry => {
        const [id, gatewayIps] = entry.split('=');
        return {
          id: parseInt(id),
          gatewayIps: gatewayIps ? gatewayIps.split(',') : []
        };
      }) : [];
      this.set('lans', lans)
    },

    addGatewayIp(lanId, gatewayIp) {
      if (ValidateIPaddress(gatewayIp)) {
        let existingLan = this.lans.filter((lan) => {
          return lan.id === lanId;
        })[0];
  
        if (existingLan === undefined) {
          this.lans.pushObject({
            id: lanId,
            gatewayIps: [gatewayIp],
          });
        } else {
          existingLan.gatewayIps.pushObject(gatewayIp);
        }
  
        this.send('updateNatLansToGatewaysMap');
      }
    },

    deleteGatewayIp(lan, index) {
      lan.gatewayIps.removeAt(index);
      if (lan.gatewayIps.length === 0) {
        this.lans.removeObject(lan);
      }
      this.send('updateNatLansToGatewaysMap');
    },

    addPublicIp(newPublicIp) {
      if (ValidateIPaddress(newPublicIp)) {
        this.config.natPublicIps.pushObject(newPublicIp)
        this.set("newPublicIp", "");
      }
    },

    deletePublicIp(index) {
      this.config.natPublicIps.removeAt(index);
    },

    addNicIp(newIp) {
      if (ValidateIPaddress(newIp)) {
        this.config.nicIps.pushObject(newIp)
        this.set("newIp", "");
      }
    },

    deleteNicIp(index) {
      this.config.nicIps.removeAt(index);
    },
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
      createNat: false,
      privateLan: false,
      password: '',
      endpoint: 'https://api.ionos.com/cloudapi/v6',
      serverType: 'ENTERPRISE',
      natPublicIps: [],
      nicIps: [],
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

  didInsertElement() {
    this._super(...arguments);

    // Load lans variable by unmarshalling saved natLansToGateways var
    this.send('reverseNatLansToGatewaysMap');
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

function ValidateIPaddress(ipaddress) 
{
if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress))
  {
    return (true)
  }
alert("You have entered an invalid IP address!")
return (false)
}
