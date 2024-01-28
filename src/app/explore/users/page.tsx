import UserItem from "@/components/listItems/UserItem";
import { UserProps } from "@/types/mongo/user.types";
import { Fetch } from "@/utils/fetchApi";
import { PageProps } from "@/types/page.types";
import { stringify } from "querystring";
const Users = async ({ params, searchParams }: Partial<PageProps>) => {
  const str = stringify(searchParams);
  const users: UserProps[] =
    (await Fetch({
      endpoint: "/user" + (str ? `?${str}` : ""),
      headers: {
        "cache-control": "no-store",
      } as any,
    })) || [];
  // console.log(users, "users in frontend");
  if (users.length === 0) {
    return <h3>No users found</h3>;
  }
  if (!Array.isArray(users) || (Array.isArray(users) && users.length === 0)) {
    return <h3>No users found</h3>;
  }
  return (
    <div className="w100 fcfs gap-6">
      <h3>Around { users.length} results found</h3>
      {users?.map((user, i) => {
        return <UserItem searchParams={searchParams} key={i} {...user} />;
      })}
    </div>
  );
};
export default Users;
