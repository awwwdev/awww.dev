import useGetUsers from "@/hooks/useGetUsers";
import Icon from "@/components/ui/Icon";

import { renderNoData } from "./RenderQ";

const UserSelector = ({ user, setUser, filterUserList }) => {
  const userQ = useGetUsers();

  return (
    <div className="space-y-6">
      {renderNoData(userQ) ?? (
        <>
          <div className="space-y-4">
            {/* <p className='info-line text-sm'>Type Name, Name in Farsi or Email, then select from the list.</p> */}
            <form
              onReset={(e) => {
                e.preventDefault();
                setUser(null);
                e.target["userId"].value = "";
              }}
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="flex ac gap-2">
                <input
                  className="field p-2 rd-lg min-w-60  w-full"
                  type="text"
                  name="userId"
                  list="users-list"
                  placeholder="Type Name, Name in Farsi or Email, then select from the list."
                  value={user?.id}
                  onChange={(e) => {
                    const matchingUser = userQ.data?.find((u) => u?.id === e.target.value);
                    setUser(matchingUser);
                  }}
                />
                {user && (
                  <button className="text-lg" type="reset" disabled={!user}>
                    <Icon name="i-ph-x" />
                    <span className="sr-only">Clear</span>
                  </button>
                )}
              </div>
              <datalist id="users-list">
                {userQ.data.filter(filterUserList ?? true).map((user, index) => {
                  return (
                    <option className="py-1 px-2 bg-gray2" key={index} value={user.id}>
                      {user.firstname} {user.lastname} | {user.firstnameFa} {user.lastnameFa} | {user.email}
                    </option>
                  );
                })}
              </datalist>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default UserSelector;
