import { memberList } from "../utils/memberList";

const goToPage = (url) => {
  window.open(url, "_blank");
};

const Members = () => {
  return (
    <div className="members flex flex-wrap justify-center gap-8 py-8 ">
      {memberList.map((member, index) => (
        <div
          key={index}
          className="circle flex flex-col justify-center items-center md:max-w-[400px] bg-white p-6 rounded-md shadow-lg text-center"
        >
          <img
            src={`${member.image}`}
            alt={member.name}
            className="w-40 h-40 rounded-full"
          />
          <p className="person mt-4 text-xl font-semibold">{member.name}</p>
          <p className="person text-md text-gray-600">{member.role}</p>
          <div className="social flex justify-center space-x-4 mt-4">
            <i
              className="fa-brands text-[#0866ff] scale-150 fa-facebook link cursor-pointer"
              onClick={() => goToPage(member.social[0])}
            ></i>
            <i
              className="fa-brands scale-150 text-black fa-x-twitter link cursor-pointer"
              onClick={() => goToPage(member.social[1])}
            ></i>
            <i
              className="fa-brands scale-150 text-[#ca0c0f] fa-instagram link cursor-pointer"
              onClick={() => goToPage(member.social[2])}
            ></i>
            <i
              className="fa-brands scale-150 text-[#0077b5] fa-linkedin link cursor-pointer"
              onClick={() => goToPage(member.social[3])}
            ></i>
            <i
              className="fa-brands text-black scale-150 fa-github link cursor-pointer"
              onClick={() => goToPage(member.social[4])}
            ></i>
          </div>
          <q className="quote mt-4 block text-gray-700">{member.quote}</q>
        </div>
      ))}
    </div>
  );
};

export default Members;
