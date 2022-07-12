targetScope = 'subscription'

param systemName string

@allowed([
  'dev'
  'test'
  'prod'
])
param environmentName string
param location string = deployment().location
param locationAbbreviation string
param containerVersion string

var appResourceGroupName = toLower('${systemName}-app-${environmentName}-${locationAbbreviation}')
var integrationResourceGroupName = toLower('${systemName}-integration-${environmentName}-${locationAbbreviation}')

resource appResourceGroup 'Microsoft.Resources/resourceGroups@2021-04-01' = {
  name: appResourceGroupName
  location: location
}

module resourcesModule 'resources.bicep' = {
  name: 'ResourceModule'
  scope: appResourceGroup
  params: {
    defaultResourceName: toLower('${systemName}-api-${environmentName}-${locationAbbreviation}')
    location: location
    environmentName: environmentName
    containerVersion: containerVersion
    containerAppEnvironmentResourceGroupName: integrationResourceGroupName
    containerAppEnvironmentResourceName: toLower('${systemName}-int-${environmentName}-${locationAbbreviation}-env')
  }
}
