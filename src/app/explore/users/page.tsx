import UserItem from "@/components/listItems/UserItem";
import { UserProps } from "@/types/mongo/user.types";
import { Fetch } from "@/utils/fetchApi";
import { PageProps } from "@/types/page.types";
import { stringify } from "querystring";
import ToolBox from "@/components/ToolBox";
import InfiniteScroll from "@/components/InfiniteScroll";

const Users = async ({ params, searchParams }: Partial<PageProps>) => {
  const str = stringify(searchParams);
  const users: UserProps[] =
    (await Fetch({
      endpoint: "/user" + (str ? `?${str}` : ""),
      // headers: {
      //   "cache-control": "no-store",
      // } as any,
      revalidate: 3600 * 3, // TODO - set revalidate time
    })) || [];
  // console.log(users, "users in frontend");
  if (!Array.isArray(users) || (Array.isArray(users) && users.length === 0)) {
    return <h3>No users found</h3>;
  }
  if (!Array.isArray(users) || (Array.isArray(users) && users.length === 0)) {
    return <h3>No users found</h3>;
  }
  return (
    <div className="w100 fcfs gap-6">
      <ToolBox count={users.length} />
      {users.map((user, i) => {
        return <UserItem searchParams={searchParams} key={i} {...user} />;
      })}
      <InfiniteScroll itemsCount={users.length} />
    </div>
  );
};
export default Users;
