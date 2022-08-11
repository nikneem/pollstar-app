param defaultResourceName string
param location string
param containerVersion string
param containerAppEnvironmentResourceGroupName string
param containerAppEnvironmentResourceName string

@allowed([
  'dev'
  'test'
  'prod'
])
param environmentName string

var containerName = environmentName == 'prod' ? 'pollstar-app' : 'pollstar-app-${environmentName}'

resource containerAppEnvironments 'Microsoft.App/managedEnvironments@2022-03-01' existing = {
  name: containerAppEnvironmentResourceName
  scope: resourceGroup(containerAppEnvironmentResourceGroupName)
}
resource containerAppEnvironmentCertificate 'Microsoft.App/managedEnvironments/certificates@2022-03-01' existing = {
  name: '${containerAppEnvironmentResourceName}/pollstar-test.hexmaster.nl'
  scope: resourceGroup(containerAppEnvironmentResourceGroupName)
}

resource apiContainerApp 'Microsoft.App/containerApps@2022-03-01' = {
  name: '${defaultResourceName}-cnt-api'
  location: location
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    managedEnvironmentId: containerAppEnvironments.id
    configuration: {
      activeRevisionsMode: 'Single'
      ingress: {
        external: true
        targetPort: 80
        transport: 'auto'
        allowInsecure: false
        traffic: [
          {
            weight: 100
            latestRevision: true
          }
        ]
        customDomains:[
          {
            certificateId: containerAppEnvironmentCertificate.id
             name: 'pollstar-test.hexmaster.nl'
              bindingType: 'SniEnabled'
          }
       ]
      }

    }
    template: {
      containers: [
        {
          image: 'docker.io/nikneem/${containerName}:${containerVersion}'
          name: 'pollstar-api'
          resources: {
            cpu: json('0.25')
            memory: '0.5Gi'
          }
        }
      ]
      scale: {
        minReplicas: 0
        maxReplicas: 10
      }
    }
  }
}
