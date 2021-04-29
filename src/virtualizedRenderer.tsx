import { useRef, useEffect } from 'react';
import { AutoSizer, CellMeasurerCache, CellMeasurer, Grid } from 'react-virtualized';
import { createElement } from 'react-syntax-highlighter';

function cellRendderer({ rows, stylesheet, useInlineStyles, cache }) {
  return ({columnIndex, key, parent, rowIndex, style}) => {
    return (
      <CellMeasurer
        cache={cache}
        columnIndex={columnIndex}
        key={key}
        parent={parent}
        rowIndex={rowIndex}>
        {createElement({
          node: rows[rowIndex],
          style,
          stylesheet,
          useInlineStyles,
        })}
      </CellMeasurer>
    );
  }
}

export default function virtualizedRenderer({ overscanRowCount = 10, rowHeight = 15, autoFocus = false } = {}) {
  const cache = new CellMeasurerCache({
    defaultHeight: rowHeight,
    fixedWidth: true,
  });
  return ({ rows, stylesheet, useInlineStyles }) => {
    const gridEl = useRef(null);
    useEffect(() => {
      const listEl = document.querySelector(".ReactVirtualized__Grid")
      // @ts-ignore
      autoFocus && gridEl && listEl.focus()
    }, [gridEl, autoFocus])
    return (
    <div style={{ height: '100%' }}>
      <AutoSizer onResize={() => {
        cache.clearAll()
      }}>
        {({ height, width }) => (
          <Grid
            ref={gridEl}
            height={height}
            width={width}
            columnCount={1}
            columnWidth={width}
            deferredMeasurementCache={cache}
            overscanRowCount={overscanRowCount}
            cellRenderer={cellRendderer({ rows, stylesheet, useInlineStyles, cache })}
            rowCount={rows.length}
            rowHeight={cache.rowHeight}
          />
        )}
      </AutoSizer>
    </div>
    )
  }
}
