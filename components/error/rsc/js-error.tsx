import JsError from '../items/js-error';
import DataTable from '../data-table/js-error/data-table';
import InfoContent from '../data-table/js-error/info/content';

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, unknown>;
}) {
  return (
    <>
      <JsError />
      <DataTable>
        <InfoContent searchParams={searchParams} />
      </DataTable>
    </>
  );
}
