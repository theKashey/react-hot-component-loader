
    /* eslint-disable */
    /* tslint:disable */
     
    import {assignImportedComponents} from 'react-imported-component/boot';
    
    const applicationImports = [
      () => import('./components/Another'),
      () => import(/* webpackChunkName: "namedChunk-1" */'./components/Other'),
      () => import(/* webpackChunkName: "namedChunk-1" */'./components/OtherTween'),
    ];
    
    assignImportedComponents(applicationImports);
    export default applicationImports;