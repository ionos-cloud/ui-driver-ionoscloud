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
      this.set('config.additionalLans', this.config.additionalLans);

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
      if (validateIp(gatewayIp)) {
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
      } else {
        alert("You have entered an invalid IP address!");
      }
    },

    deleteGatewayIp(lan, index) {
      lan.gatewayIps.removeAt(index);
      if (lan.gatewayIps.length === 0) {
        this.lans.removeObject(lan);
      }
      this.send('updateNatLansToGatewaysMap');
    },

    addFlowlog(flowlogName, flowlogAction, flowlogDirection, flowlogBucket) {
      if (!flowlogName) {
        alert("Flowlog name should not be null!");
        return
      }
      if (!flowlogBucket) {
        alert("Flowlog bucket should not be null!");
        return
      }
      let newFlowlog = [flowlogName, flowlogAction, flowlogDirection, flowlogBucket].join(':')
      if (this.config.natFlowlogs.includes(newFlowlog)) {
        alert("Flowlog already exists!");
        return
      }
      this.config.natFlowlogs.pushObject(newFlowlog);
    },

    deleteFlowlog(index) {
      this.config.natFlowlogs.removeAt(index);
    },

    addNatRule(natRuleName, natRuleType, natRuleProtocol, natRulePublicIp,
      natRuleSourceSubnet, natRuleTargetSubnet, natRulePortStart, natRulePortEnd) {
      if (!natRuleName) {
        alert("NAT rule name should not be null!");
        return
      }
      if (natRulePublicIp && !validateIp(natRulePublicIp)) {
        alert("Invalid IP detected: " + natRulePublicIp );
        return false;
      }
      if (natRuleSourceSubnet && !validateSubnet(natRuleSourceSubnet)) {
        alert("Invalid Source Subnet detected: " + natRuleSourceSubnet );
        return false;
      }
      if (natRuleTargetSubnet && !validateSubnet(natRuleTargetSubnet)) {
        alert("Invalid Target Subnet detected: " + natRuleTargetSubnet );
        return false;
      }
      if (natRulePortStart && Number.isNaN(parseInt(natRulePortStart))) {
        alert("Invalid Start Port detected: " + natRulePortStart );
        return;
      }
      if (natRulePortEnd && Number.isNaN(parseInt(natRulePortEnd))) {
        alert("Invalid End Port detected: " + natRulePortEnd );
        return false;
      }

      let newRule = [natRuleName, natRuleType, natRuleProtocol, natRulePublicIp,
        natRuleSourceSubnet, natRuleTargetSubnet, natRulePortStart, natRulePortEnd].join(':')
      if (this.config.natRules.includes(newRule)) {
        alert("Rule already exists!");
        return
      }
      this.config.natRules.pushObject(newRule);
    },

    deleteNatRule(index) {
      this.config.natRules.removeAt(index);
    },

    addPublicIp(newPublicIp) {
      if (validateIp(newPublicIp)) {
        this.config.natPublicIps.pushObject(newPublicIp)
        this.set("newPublicIp", "");
      } else {
        alert("You have entered an invalid IP address!");
      }
    },

    deletePublicIp(index) {
      this.config.natPublicIps.removeAt(index);
    },

    addNicIp(newIp) {
      if (validateIp(newIp)) {
        this.config.nicIps.pushObject(newIp)
        this.set("newIp", "");
      } else {
        alert("You have entered an invalid IP address!");
      }
    },

    deleteNicIp(index) {
      this.config.nicIps.removeAt(index);
    },

    addAdditionalLan(newLan) {
      if (newLan) {
        this.config.additionalLans.pushObject(newLan)
        this.set("newLan", "");
      } else {
        alert("Please enter a LAN name!");
      }

    },

    deleteAdditionalLan(index) {
      this.config.additionalLans.removeAt(index);
    },
  },

  // Write your component here, starting with setting 'model' to a machine with your config populated
  bootstrap: function() {
    // bootstrap is called by rancher ui on 'init', you're better off doing your setup here rather then the init function to ensure everything is setup correctly
    let config = get(this, 'globalStore').createRecord({
      type: '%%DRIVERNAME%%Config',
      cores: 2,
      ram: 2048,
      cloudInit: '',
      token: '',
      username: '',
      createNat: false,
      privateLan: false,
      sshInCloudInit: false,
      waitForIpChange: false,
      waitForIpChangeTimeout: 600,
      password: '',
      endpoint: 'https://api.ionos.com/cloudapi/v6',
      serverType: 'ENTERPRISE',
      flowlogAction: 'ALL',
      flowlogDirection: 'BIDIRECTIONAL',
      natRuleType: 'SNAT',
      natRuleProtocol: 'ALL',
      natPublicIps: [],
      nicDhcp: false,
      additionalLans: [],
      nicIps: [],
      natFlowlogs: [],
      natRules: [
        'rule01:SNAT:TCP::::22:22',
        'rule02:SNAT:UDP::::53:53',
        'rule03:SNAT:TCP::::80:80',
        'rule04:SNAT:TCP::::179:179',
        'rule05:SNAT:TCP::::443:443',
        'rule06:SNAT:TCP::::2376:2376',
        'rule07:SNAT:UDP::::4789:4789',
        'rule08:SNAT:TCP::::6443:6443',
        'rule09:SNAT:TCP::::6783:6783',
        'rule10:SNAT:TCP::::8443:8443',
        'rule11:SNAT:UDP::::8472:8472',
        'rule12:SNAT:TCP::::9099:9099',
        'rule13:SNAT:TCP::::9100:9100',
        'rule14:SNAT:TCP::::9443:9443',
        'rule15:SNAT:TCP::::9796:9796',
        'rule16:SNAT:TCP::::10254:10254',
        'rule17:SNAT:TCP::::10256:10256',
        'rule18:SNAT:TCP::::2379:2380',
        'rule19:SNAT:UDP::::6783:6784',
        'rule20:SNAT:TCP::::10250:10252',
        'rule21:SNAT:TCP::::30000:32767',
        'rule22:SNAT:UDP::::30000:32767',
        'rule23:SNAT:ALL:::::',
      ],
      skipDefaultNatRules: true,
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
  ],

  flowlogActionOptions: [
    {
      name: 'ALL',
      value: 'ALL'
    },
    {
      name: 'ACCEPTED',
      value: 'ACCEPTED',
    },
    {
      name: 'REJECTED',
      value: 'REJECTED'
    },
  ],

  flowlogDirectionOptions: [
    {
      name: 'BIDIRECTIONAL',
      value: 'BIDIRECTIONAL',
    },
    {
      name: 'INGRESS',
      value: 'INGRESS',
    },
    {
      name: 'EGRESS',
      value: 'EGRESS'
    },
  ],

  natRuleTypeOptions: [
    {
      name: 'SNAT',
      value: 'SNAT',
    },
  ],

  natRuleProtocolOptions: [
    {
      name: 'ALL',
      value: 'ALL',
    },
    {
      name: 'TCP',
      value: 'TCP',
    },
    {
      name: 'UDP',
      value: 'UDP'
    },
    {
      name: 'ICMP',
      value: 'ICMP'
    },
  ]
});

function validateIp(ip) {
  if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip)) {
    return (true);
  }
  return (false);
}

function validateSubnet(subnet) {
  let splitSubnet = subnet.split('/')
  return (splitSubnet.length == 2 && validateIp(splitSubnet[0]) && !(Number.isNaN(parseInt(splitSubnet[1]))))
}
