import Link from "next/link";

function LinkButton({link, text}) {
      return (
            <Link href={link}>{text}</Link>
       );
}

export default LinkButton;