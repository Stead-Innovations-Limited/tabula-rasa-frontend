import { Suspense } from 'react';
import Calle from './Calle';

 export default function Page() {
  return(<>
  <div>Loading</div>
    <Suspense fallback={<div>Loading...</div>}>
      <Calle />
    </Suspense>
  </>);
}
