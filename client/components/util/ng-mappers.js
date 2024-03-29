// Maps API responses to UI-friendly structures.

// Supports the data center list page.
exports.organizeDataCenters = function(srcProviders, generalRegions) {
  var destProviders = {};
  for (var i = 0; i < srcProviders.length; i++) {
  
    // Initialize provider data structure.
    var srcProvider = srcProviders[i];
    var providerKey = srcProvider.key;
    destProviders[providerKey] = {
      name: srcProvider.name,
      specialRegions: {}
    };
    var destProvider = destProviders[providerKey];
    for (var j = 0; j < generalRegions.length; j++) {
      var generalRegion = generalRegions[j];
      destProvider.specialRegions[generalRegion.key] = [];
    }
    
    // Distribute the provider's special regions into into general regional buckets.
    destProvider = destProviders[providerKey];
    var srcSpecialRegions = srcProvider.regions;
    for (j = 0; j < srcSpecialRegions.length; j++) {
      var srcSpecialRegion = srcSpecialRegions[j];
      var generalRegionKey = srcSpecialRegion.regionKey;
      destProvider.specialRegions[generalRegionKey].push(srcSpecialRegion);
    }
  }
  return destProviders;
};

// Adds percentages to the node stats object.
exports.enrichNodeStats = function(nodeStats) {
  nodeStats.percentHealthy = 100 * (nodeStats.numHealthy / nodeStats.numNodes);
  nodeStats.percentEnabled = 100 * (nodeStats.numEnabled / nodeStats.numNodes);
  nodeStats.percentHealthyGivenEnabled = 100 * (nodeStats.numHealthyGivenEnabled / nodeStats.numEnabled);
};

// Supports the service instance details page.
exports.nodePageToNodeRows = function(nodePage) {
  var nodes = nodePage;
  
  // Build the node table, which is really a list of IP addresses grouped by node. [WLW]
  var nodeRows = [];
  var nodeRow = {};
  for (var i = 0; i < nodes.length; i++) {
    
    var node = nodes[i];
    
    if (node.healthStatus === null) {
      node.healthStatus = {
        key: 'unknown',
        name: 'Unknown',
        statusType: { 
          key: 'warning'
        }
      };
    }
    
    var ipAddresses = node.ipAddresses;
    
    if (ipAddresses.length === 0) {
      // Handle special case where there aren't any IP addresses.
      nodeRow = {
        name: node.name,
        displayName: node.name,
        buildVersion: node.buildVersion || '-',
        healthStatus: node.healthStatus
      };
      nodeRows.push(nodeRow);
    } else {
      // Handle case where there are IP addresses.
      for (var j = 0; j < ipAddresses.length; j++) {
        var ipAddress = ipAddresses[j];
        nodeRow = {
          name: node.name,
          ipAddress: ipAddress.ipAddress,
          ipAddressRole: ipAddress.ipAddressRole.name,
          endpoints: ipAddress.endpoints,
          ipAggregateRotationStatus: ipAddress.aggregateRotationStatus
        };
        if (j === 0) {
          // Distinguish name from display name. We want to filter by name, but display by displayName.
          nodeRow.displayName = node.name;
          nodeRow.buildVersion = node.buildVersion || '-';
          nodeRow.healthStatus = node.healthStatus;
          nodeRow.nodeAggregateRotationStatus = node.aggregateRotationStatus;
        }
        nodeRows.push(nodeRow);
      }
    }
  }
    
  return nodeRows;
};

exports.statusTypeMapper = function(healthStatus) {
  var statusType;
  switch(healthStatus) {
    case 'endabled':
    case 'Healthy': statusType = 'success';
      break;
    case 'excluded':
    case 'New':
    case 'DowngradeNeeded':
    case 'PatchNeeded':
    case 'UpgradeNeeded':
    case 'Deploy': statusType = 'info';
      break;
    case 'DeploymentCancelled':
    case 'ManualIntervention':
    case 'PatchCancelled':
    case 'PatchFailed':
    case 'Retribution':
    case 'Victim':
    case 'disabled':
    case 'partial':
    case 'unknown':
    case 'DeploymentFailed': statusType = 'warning';
      break;
    case 'Dead':
    case 'Perpetrator':
    case 'Purgatory': statusType = 'danger';
      break;
    case 'no-endpoints':
    case 'Discovery':
    case 'Inactive': statusType = 'default';
      break;
    default : statusType = undefined;
      break; 
  }
  return {
    key: statusType
  };
};

exports.objectToParams = function(obj) {
  var paramString = '?';
  for (var k in obj) {
    paramString += k + obj[k];
  }
};

