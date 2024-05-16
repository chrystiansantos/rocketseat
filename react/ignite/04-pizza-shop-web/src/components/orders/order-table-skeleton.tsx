import { Search } from 'lucide-react'

import { Button } from '../ui/button'
import { Skeleton } from '../ui/skeleton'
import { TableCell, TableRow } from '../ui/table'

export function OrderTableSkeleton() {
  return Array.from({ length: 10 }).map((_, i) => (
    <TableRow key={i}>
      <TableCell>
        <Button variant="outline" size="xs" disabled>
          <Search className="h-3 w-3" />
          <span className="sr-only">Detalhes do pedido</span>
        </Button>
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-[172px]" />
      </TableCell>
      <TableCell className="">
        <Skeleton className="h-4 w-[148px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-[110px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-[210px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-[64px]" />
      </TableCell>
      <TableCell>
        <TableCell>
          <Skeleton className="h-4 w-[92px]" />
        </TableCell>
      </TableCell>
      <TableCell>
        <TableCell>
          <Skeleton className="h-4 w-[92px]" />
        </TableCell>
      </TableCell>
    </TableRow>
  ))
}
