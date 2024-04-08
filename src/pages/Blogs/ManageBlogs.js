import React from 'react';
import { Table } from '../../components/TableSettings';

const ManageBlogs = () => {
  return (
    <section class="mx-auto w-full max-w-7xl px-4 py-4">
      <div class="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h2 class="text-lg font-semibold">Blogs</h2>
          <p class="mt-1 text-sm text-gray-700">
            This is a list of all blogs. You can add new blogs, edit or delete
            existing ones.
          </p>
        </div>
        <div>
          <button
            type="button"
            class="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Add new Blogs
          </button>
        </div>
      </div>
      <div class="mt-6 flex flex-col">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div class="overflow-hidden border border-gray-200 md:rounded-lg">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      class="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                    >
                      <span>Blog Id</span>
                    </th>
                    <th
                      scope="col"
                      class="px-12 py-3.5 text-left text-sm font-normal text-gray-700"
                    >
                      Blog Title
                    </th>
                    <th
                      scope="col"
                      class="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                    >
                      Blog Description
                    </th>

                    <th
                      scope="col"
                      class="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                  {Array(5)
                    .fill(true)
                    .map((item) => {
                      return (
                        <tr>
                          <td class="whitespace-nowrap px-4 py-4">
                            <div class="flex items-center">
                              <div class="h-10 w-10 flex-shrink-0">
                                <img
                                  class="h-10 w-10 rounded-full object-cover"
                                  src="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1160&amp;q=80"
                                  alt=""
                                />
                              </div>
                              <div class="ml-4">
                                <div class="text-sm font-medium text-gray-900">
                                  John Doe
                                </div>
                                <div class="text-sm text-gray-700">
                                  john@devui.com
                                </div>
                              </div>
                            </div>
                          </td>
                          <td class="whitespace-nowrap px-12 py-4">
                            <div class="text-sm text-gray-900 ">
                              Front-end Developer
                            </div>
                            <div class="text-sm text-gray-700">Engineering</div>
                          </td>
                          <td class="whitespace-nowrap px-4 py-4">
                            <span class="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                              Active
                            </span>
                          </td>

                          <td class="whitespace-nowrap px-4 py-4 text-sm text-gray-700 space-x-4">
                            <span className="cursor-pointer">Edit</span>
                            <span className="cursor-pointer">View</span>
                            <span className="cursor-pointer">Delete</span>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManageBlogs;
