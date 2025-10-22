import IconButton from "@/shared/ui/IconButton";
import Image from "next/image";

export default function Product() {
  return (
    <div className="bg-white flex-1 min-w-[150px] max-w-[180px] p-2.5 flex flex-col gap-2.5 rounded-[30px]" style={{ boxShadow: '-1px -5px 61px rgba(139, 138, 138, 0.12)' }}>
      <div className="bg-white rounded-[20px] flex justify-center" style={{ boxShadow: '-1px -5px 61px rgba(139, 138, 138, 0.12)' }}>
        <Image
          src="/images/products/spinach.png"
          width={100}
          height={100}
          alt="Product" />
      </div>
      <div>
        <div className="flex flex-col gap-[5px]">
          <h5 className="h5-bold">Baby Spinach</h5>
          <span className="h6-regular">250 gm</span>
        </div>
        <div className="flex justify-between items-center mt-[7px]">
          <b className="medium-bold">$2.19</b>
          <IconButton variant="success" size="medium">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.05786 10.5986C6.4174 10.5986 6.70915 10.8905 6.70923 11.25C6.70923 11.6096 6.41745 11.9014 6.05786 11.9014C5.69834 11.9013 5.40649 11.6095 5.40649 11.25C5.40658 10.8905 5.69839 10.5987 6.05786 10.5986Z" fill="white" stroke="white" stroke-width="0.428571" />
              <path d="M10.0962 10.5986C10.4557 10.5986 10.7475 10.8905 10.7476 11.25C10.7476 11.6096 10.4558 11.9014 10.0962 11.9014C9.73667 11.9013 9.44482 11.6095 9.44482 11.25C9.44491 10.8905 9.73672 10.5987 10.0962 10.5986Z" fill="white" stroke="white" stroke-width="0.428571" />
              <path d="M12.1153 4.03816H4.23112L3.56535 2.44009C3.47795 2.22959 3.33003 2.04978 3.14033 1.92345C2.95062 1.79712 2.72769 1.72996 2.49977 1.73047H1.15381V2.88432H2.50035L5.23669 9.45259C5.32612 9.6672 5.53669 9.8074 5.76919 9.8074H10.3846C10.6252 9.8074 10.8403 9.65797 10.9252 9.43355L12.6559 4.81816C12.6883 4.73081 12.6992 4.63693 12.6875 4.54449C12.6759 4.45204 12.6421 4.36378 12.589 4.2872C12.536 4.21062 12.4652 4.14799 12.3827 4.10463C12.3002 4.06128 12.2085 4.03847 12.1153 4.03816ZM9.80766 7.4997H8.65381V8.65355H7.49996V7.4997H6.34612V6.34586H7.49996V5.19201H8.65381V6.34586H9.80766V7.4997Z" fill="white" />
            </svg>
          </IconButton>

        </div>
      </div>
    </div>
  )
}

