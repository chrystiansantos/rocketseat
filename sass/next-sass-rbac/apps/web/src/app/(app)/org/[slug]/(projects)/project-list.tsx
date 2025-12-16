import { ArrowRight } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function ProjectList() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Projeto 01</CardTitle>
          <CardDescription className="line-clamp-2 leading-relaxed">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi ad
            magnam ipsum totam enim quia omnis, vero, perferendis maxime,
            recusandae illo. Ipsa dolores cumque aperiam aut ut? Quia, hic ut?
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex items-center gap-1.5">
          <Avatar className="size-4">
            <AvatarImage src="https://github.com/chrystiansantos.png" />
            <AvatarFallback></AvatarFallback>
          </Avatar>
          <span className="text-muted-foreground text-xs">
            Created by{' '}
            <span className="text-foreground font-medium">
              Chrystian Santos
            </span>{' '}
            a day ago
          </span>
          <Button variant="outline" className="ml-auto" size="xs">
            View <ArrowRight className="ml-2 size-3" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
