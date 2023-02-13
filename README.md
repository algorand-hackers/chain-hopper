# Chain Hopper


## Getting Started

Clone  

```bash
yarn install
```

### Useful Commands

- `yarn build` - Build all packages including the Bridge site
- `yarn dev` - Run all packages locally
- `yarn lint` - Lint all packages
- `yarn changeset-create` - Generate a changeset
- `yarn clean` - Clean up all `node_modules` and `dist` folders (runs each package's clean script)

## Apps & Packages

This Turborepo includes the following packages and applications:

- `apps/frontend`: The bridge site
- `packages/@chain-hopper/sdk`: Unified SDK that incorporates Wormhole and Glitter plus potential for integrating others
- `packages/ts-config-chain-hopper`: Shared `tsconfig.json`s used throughout the Turborepo
- `packages/eslint-config-chain-hopper`: Shared eslint config

Yarn Workspaces enables us to "hoist" dependencies that are shared between packages to the root `package.json`. This means smaller `node_modules` folders and a better local dev experience. To install a dependency for the entire monorepo, use the `-W` workspaces flag with `yarn add`.


## Useful links
- [How to add a new bridge](packages/sdk/How-to-add-a-new-bridge.md)
- [Demo](https://drive.google.com/file/d/1trVFDEmWr_aqwx7EjDiUozrZJ_juTjES/view)
- [Frontend Deployment](https://chains-frontend.vercel.app/)
- [Figma design](https://www.figma.com/proto/C8DkuVao08iMz7xNCvHUea/ChainHooper?page-id=292%3A11879&node-id=298%3A26390&viewport=2773%2C-1033%2C0.19&scaling=min-zoom&starting-point-node-id=298%3A26390)
