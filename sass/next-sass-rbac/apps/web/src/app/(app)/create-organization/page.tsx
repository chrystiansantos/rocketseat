import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function CreateOrganization() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Create organization</h1>

      <form className="space-y-4">
        {/* {success === false && message && (
          <Alert variant="destructive">
            <AlertTriangle className="size-4" />
            <AlertTitle>Sign in failed!</AlertTitle>
            <AlertDescription>
              <p>{message}</p>
            </AlertDescription>
          </Alert>
        )} */}
        <div className="space-y-1">
          <Label htmlFor="name">Organization name</Label>
          <Input name="name" id="name" />
          {/* {errors?.properties?.name && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors.properties.name.errors[0]}
            </p>
          )} */}
        </div>

        <div className="space-y-1">
          <Label htmlFor="domain">E-mail domain</Label>
          <Input
            name="domain"
            type="text"
            id="domain"
            inputMode="url"
            placeholder="example.com"
          />
          {/* {errors?.properties?.email && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors.properties.email.errors[0]}
            </p>
          )} */}
        </div>

        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input name="password" type="password" id="password" />
          {/* {errors?.properties?.password && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors.properties.password.errors[0]}
            </p>
          )} */}
        </div>

        <div className="space-y-1">
          <div className="flex items-baseline space-x-2">
            <Checkbox
              name="shouldAttachUsersByDomain"
              id="shouldAttachUsersByDomain"
              className="translate-y-0.5"
            />
            <label className="space-y-1" htmlFor="shouldAttachUsersByDomain">
              <span className="text-sm leading-none font-medium">
                Auto join new members
              </span>
              <p className="text-muted-foreground text-sm">
                This will automatically invite all members with same e-mail
                domain to this organization.
              </p>
            </label>
          </div>
        </div>

        <Button className="w-full" type="submit">
          Save organization
        </Button>
      </form>
    </div>
  )
}
