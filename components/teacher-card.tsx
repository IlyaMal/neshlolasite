import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatPrice, formatExperience, formatTeachingFormat } from "@/lib/utils/format"
import type { Teacher } from "@/lib/types"
import Link from "next/link"

interface TeacherCardProps {
  teacher: Teacher
}

export function TeacherCard({ teacher }: TeacherCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
      <CardContent className="p-6">
        {/* Avatar */}
        <div className="flex items-center gap-4 mb-4">
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center overflow-hidden">
            {teacher.photo ? (
              <img
                src={teacher.photo || "/placeholder.svg"}
                alt={teacher.name}
                className="h-16 w-16 rounded-full object-cover"
              />
            ) : (
              <span className="text-xl font-semibold text-primary">{teacher.name.charAt(0)}</span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground truncate">{teacher.name}</h3>
            <p className="text-sm text-muted-foreground">{formatExperience(teacher.experience)} опыта</p>
          </div>
        </div>

        {/* Subject and Format */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
            {teacher.subject}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {formatTeachingFormat(teacher.format)}
          </Badge>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{teacher.description}</p>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-foreground">{formatPrice(teacher.pricePerHour)}</span>
            <span className="text-sm text-muted-foreground ml-1">/час</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button asChild className="w-full">
          <Link href={`/teacher/${teacher.id}`}>Подробнее</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
