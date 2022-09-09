param defaultResourceName string
param location string
param containerVersion string
param containerAppEnvironmentResourceGroupName string
param containerAppEnvironmentResourceName string

// @allowed([
//   'dev'
//   'test'
//   'prod'
// ])
// param environmentName string

param containerPort int = 80
param containerAppName string = 'pollstar-app'

//var containerName = environmentName == 'prod' ? 'pollstar-app' : 'pollstar-app-${environmentName}'

resource containerAppEnvironments 'Microsoft.App/managedEnvironments@2022-03-01' existing = {
  name: containerAppEnvironmentResourceName
  scope: resourceGroup(containerAppEnvironmentResourceGroupName)
}

resource apiContainerApp 'Microsoft.App/containerApps@2022-03-01' = {
  name: '${defaultResourceName}-aca'
  location: location
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    managedEnvironmentId: containerAppEnvironments.id

    configuration: {
      activeRevisionsMode: 'Single'
      secrets: []
      ingress: {
        external: true
        targetPort: containerPort
        transport: 'auto'
        allowInsecure: false
        traffic: [
          {
            weight: 100
            latestRevision: true
          }
        ]
        customDomains: [
          {
            certificateId: '${containerAppEnvironments.id}/certificates/pollstar-app'
            name: 'pollstar.hexmaster.nl'
            bindingType: 'SniEnabled'
          }
        ]
      }
      dapr: {
        enabled: false
      }
    }
    template: {
      containers: [
        {
          image: 'pollstarinttestneuacr.azurecr.io/${containerAppName}:${containerVersion}'
          name: containerAppName
          resources: {
            cpu: json('0.25')
            memory: '0.5Gi'
          }
          env: []
        }
      ]
      scale: {
        minReplicas: 1
        maxReplicas: 6
        rules: [
          {
            name: 'http-rule'
            http: {
              metadata: {
                concurrentRequests: '30'
              }
            }
          }
        ]
      }
    }
  }
}
