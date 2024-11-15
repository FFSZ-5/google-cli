import { LazyExoticComponent, Suspense } from "react";

const LazyImportComponent = (props: {
  lazyChildren: LazyExoticComponent<() => JSX.Element>;
}) => {
  console.log("lfsz", 123);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <props.lazyChildren />
    </Suspense>
  );
};

export default LazyImportComponent;