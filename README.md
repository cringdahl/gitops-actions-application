# GitOps & GitHub Actions CI/CD Example

This is part of a two repo demo for Gitops and Github Actions. This is the application repo, and there's also a [manifest repo](https://github.com/cringdahl/gitops-actions-manifests).

This application repo contains Github Actions that will do the following:
* build a new image on PR creation
* push it to ghcr.io/cringdahl/example-app
* trigger a PR open request in the manifest repo

The manifest repo will then:
* create the requested PR
* update the dev manifest with the image tag

After presumed testing, we go back to the application repo and close the PR. That triggers an Action with:
* if merge
    * create new Github repo code release (just integer+1)
    * tag the PR image with new release version
    * ask the manifest repo to merge it's PR
* if no merge
    * TODO: ask the manifest repo to close it's PR
    * TODO: clean up the app image

The manifest repo will then:
* if merge
    * add the new version to the production manifest
    * merge and close the manifest PR
* if no merge
    * close the manifest PR

## Configure the Build

You'll need an ArgoCD instance configured and running in a Kubernetes cluster, using the manifest repo as an appset source.

You'll also need a classic auth Github PAT with `public_repo` permissions. Add the PAT to the */settings/secrets/actions* page of this repository. This demo assumes the same user/org owns both repositories, so no further permissions are required.

## Local Development

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application in a browser.
