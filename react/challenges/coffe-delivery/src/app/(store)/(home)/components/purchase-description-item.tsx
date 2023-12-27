import {
  IconDescription,
  IconPurchase,
} from '@/app/components/icon-description'

interface PurchaseDescriptionItemProps {
  iconName: IconPurchase
  bgIcon: string
  description: string
}

export default function PurchaseDescriptionItem({
  iconName,
  bgIcon,
  description,
}: PurchaseDescriptionItemProps) {
  return (
    <div className="flex items-center gap-3">
      <IconDescription name={iconName} className={bgIcon} />
      <span>{description}</span>
    </div>
  )
}
