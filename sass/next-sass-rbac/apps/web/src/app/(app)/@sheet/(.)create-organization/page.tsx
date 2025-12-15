import { OrganizationForm } from '@/app/(app)/org/organization-form'
import { InterceptedSheetContent } from '@/components/intercepted-sheet-content'
import { Sheet, SheetHeader, SheetTitle } from '@/components/ui/sheet'

export default function CreateOrganization() {
  return (
    <Sheet defaultOpen>
      <InterceptedSheetContent>
        <SheetHeader>
          <SheetTitle>Cerate organization</SheetTitle>
        </SheetHeader>

        <div className="p-4">
          <OrganizationForm />
        </div>
      </InterceptedSheetContent>
    </Sheet>
  )
}
