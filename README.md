# GitOps & GitHub Actions CI/CD Example

This repository works in concert with [this manifest repository](https://github.com/evanshortiss/gitops-actions-manifests)
to create a continuous delivery pipeline with OpenShift GitOps (based on Argo CD).

Code changes in this repository will trigger a workflow that builds this
application into a [container image hosted on quay.io](https://quay.io/repository/evanshortiss/gitops-and-actions?tab=tags).
Once the build is complete, it will trigger a [workflow](https://github.com/evanshortiss/gitops-actions-manifests/blob/main/.github/workflows/update-container-image.yaml)
that creates a PR in the manifest repository that updates the [deployment manifests](https://github.com/evanshortiss/gitops-actions-manifests/blob/main/helm/values.yaml#L4)
to use the new container image tag. Merging that PR will automatically deploy the new
container image on your OpenShift or Kubernetes cluster.

## Configure the Build

Enabling the end-to-end CI/CD process requires setting the following variables in
the */settings/secrets/actions* page of this repository.

* QUAY_USERNAME
* QUAY_PASSWORD
* MANIFEST_PAT

These variables are used in the [CI workflow](https://github.com/evanshortiss/gitops-actions-application/blob/main/.github/workflows/build-container-image.yaml).

The `QUAY_USERNAME` and `QUAY_PASSWORD` variables are credentials for a [quay.io](https://quay.io/)
Robot Account that will be used to push the container image to the quay.io 
container registry. You can create a Robot Account and set permissions for Robot
Accounts in your Account Settings on quay.io. You can use Docker Hub or another
registry if you prefer, just remember to update the target **registry** CI
workflow.

The `MANIFEST_PAT` is a fine-grained GitHub personal access token. Create a MANIFEST_PAT from
your [Developer Settings](https://github.com/settings/tokens?type=beta) page.
While creating the MANIFEST_PAT, you should:

1. Set **Repository access** to your fork of the [manifest repository](https://github.com/evanshortiss/gitops-actions-manifests).
1. Configure **Permissions** to enable **Read and Write** access to **Actions**.
1. Configure **Permissions** to enable **Read and Write** access to **Content** (for `repository_dispatch` access).

## Local Development

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application in a browser.

