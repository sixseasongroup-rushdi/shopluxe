import { ArrowUpRight } from "lucide-react";

export function AnnouncementBar() {
  return (
    <div className="announcement">
      <div className="container announcement-inner">
        <span className="announcement-note">
          Thoughtfully curated. Everyday extraordinary.
        </span>
        <p>
          FOR MODERN WEBSITE DESIGN,{" "}
          <a href="mailto:hello@shopluxe.example">CONTACT US!</a>
        </p>
        <a className="lets-talk" href="mailto:hello@shopluxe.example">
          LET’S TALK <ArrowUpRight size={13} />
        </a>
      </div>
    </div>
  );
}
