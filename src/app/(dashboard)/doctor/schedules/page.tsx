import ScheduleList from "@/components/modules/doctor-schedules/schedule-list";

const DoctorSchedulesPage = () => {
  return (
    <section>
      <div>
        <h1 className="text-2xl">My schedules</h1>
        <p>Create schedules, publish them for booking, or delete drafts.</p>
      </div>
      <div>
        <ScheduleList />
      </div>
    </section>
  );
};

export default DoctorSchedulesPage;
