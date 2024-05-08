"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import PageNumberSelector from "./PageNumberSelector";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { extractColorPages } from "@/lib/colorPagesExtractor";

const DoKopiFileUpload = () => {
  const [showPageNumberSelector, setShowPageNumberSelector] = useState(false);
  const [pagesInput, setPagesInput] = useState(null);
  const handlePagesInputChange = (e) => {
    console.log("called-------");
    const res = extractColorPages(e.target.value);
    console.log(res);
    setPagesInput(res);
  };

  return (
    <section className="w-full pb-8">
      <section className="w-full">
        <div className=" h-auto">
          <main className="h-full">
            {/* <!-- file upload modal --> */}
            <article
              aria-label="File Upload Modal"
              className="relative h-full flex flex-col bg-white shadow-xl rounded-md "
            >
              {/* <!-- overlay --> */}

              {/* <!-- scroll area --> */}
              <section className="h-full overflow-auto p-0 py-4 md:p-4 w-full flex flex-col">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
                  <div className="min-h-32 rounded-lg bg-white">
                    <header className="border-dashed border-2 border-blue-400 py-12 flex flex-col justify-center items-center rounded-md h-full">
                      <p className="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
                        <span>Drag and drop your</span>&nbsp;
                        <span>files anywhere or</span>
                      </p>
                      <input
                        id="hidden-input"
                        type="file"
                        multiple
                        className="hidden"
                      />
                      <Button
                        id="button"
                        size="sm"
                        onClick={() =>
                          document.getElementById("hidden-input").click()
                        }
                        className="mt-2 rounded-sm px-3 py-1  bg-blue-500 hover:bg-blue-600 focus:shadow-outline focus:outline-none"
                      >
                        Select a file
                      </Button>
                    </header>
                  </div>
                  {/* ----------- printing prefrences------------ */}
                  <div className="min-h-32 rounded-lg bg-white border  p-4">
                    <p className="font-semibold text-gray-900 ">
                      Printing Preferences
                    </p>
                    <div className="mt-4 flex flex-col gap-4 w-full ">
                      <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="url">File URL</Label>
                        <Input
                          id="url"
                          type="text"
                          placeholder="Upload a file"
                          className="w-full"
                        />
                      </div>
                      <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="copies_count">Number of Copies</Label>
                        <Input
                          id="copies_count"
                          type="number"
                          placeholder="Copies count"
                          min="1"
                          required={true}
                          className="w-full"
                        />
                      </div>
                      <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="copies_count">Printing Type</Label>
                        <RadioGroup defaultValue="black-and-white">
                          <div className="grid md:grid-cols-3 gap-4">
                            <div className="flex items-center space-x-2 bg-white border py-2 rounded-md px-2 ">
                              <RadioGroupItem
                                value="black-and-white"
                                id="black-and-white"
                                className=""
                              />
                              <Label htmlFor="black-and-white">
                                Black & White
                              </Label>
                            </div>

                            <div className="flex items-center space-x-2 bg-white border py-2 rounded-md px-2 ">
                              <RadioGroupItem value="color" id="color" />
                              <Label htmlFor="color" className="">
                                Color
                              </Label>
                            </div>

                            <Dialog>
                              <DialogTrigger
                                className="flex items-center space-x-2"
                                asChild
                              >
                                <div className="flex items-center space-x-2 bg-white border py-2 rounded-md px-2 ">
                                  <RadioGroupItem value="mixed" id="mixed" />
                                  <Label htmlFor="mixed" className="">
                                    Mixed
                                  </Label>
                                </div>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>
                                    Customize Color Printing
                                  </DialogTitle>
                                  <DialogDescription>
                                    Enter color pages. Input numbers/ranges with
                                    commas/hyphens or pick manually. Example:
                                    1-5, 8, 10-12
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="flex items-center space-x-2">
                                  <div className="grid flex-1 gap-2">
                                    <Label htmlFor="link" className="sr-only">
                                      Link
                                    </Label>
                                    <Input
                                      id="text"
                                      placeholder="1-5, 8, 10-12"
                                      className=""
                                      onChange={handlePagesInputChange}
                                    />
                                  </div>
                                  <Button
                                    type="submit"
                                    size="sm"
                                    className="bg-blue-500  "
                                  >
                                    <span>Submit</span>
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </RadioGroup>
                        <PageNumberSelector pageCount={200} colorPages={pagesInput} />
                      </div>
                      <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="copies_count">Printing Sides</Label>
                        <RadioGroup defaultValue="double-sided">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center space-x-2 bg-white border py-2 rounded-md px-2 ">
                              <RadioGroupItem
                                value="one-sided"
                                id="one-sided"
                              />
                              <Label htmlFor="one-sided">One Sided</Label>
                            </div>
                            <div className="flex items-center space-x-2 bg-white border py-2 rounded-md px-2 ">
                              <RadioGroupItem
                                value="double-sided"
                                id="double-sided"
                                className=""
                              />
                              <Label htmlFor="double-sided">Double Sided</Label>
                            </div>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="copies_count">Paper Type</Label>
                        <RadioGroup defaultValue="a4">
                          <div className="grid grid-cols-3 gap-4">
                            <div className="flex items-center space-x-2 bg-white border py-2 rounded-md px-2 ">
                              <RadioGroupItem value="a4" id="a4" className="" />
                              <Label htmlFor="a4" className="">
                                A4
                              </Label>
                            </div>

                            <div className="flex items-center space-x-2 bg-white border  py-2 rounded-md px-2 ">
                              <RadioGroupItem value="a3" id="a3" />
                              <Label htmlFor="a3" className="">
                                A3
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2 bg-white border  py-2 rounded-md px-2 ">
                              <RadioGroupItem value="letter" id="letter" />
                              <Label htmlFor="letter" className="">
                                Letter
                              </Label>
                            </div>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="copies_count">Other Services</Label>
                        <RadioGroup defaultValue="binding">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center space-x-2 bg-white border py-2 rounded-md px-2 ">
                              <RadioGroupItem
                                value="binding"
                                id="binding"
                                className=""
                              />
                              <Label htmlFor="binding" className="">
                                Binding
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2 bg-white border py-2 rounded-md px-2 ">
                              <RadioGroupItem value="tapping" id="tapping" />
                              <Label htmlFor="tapping" className="">
                                Taping
                              </Label>
                            </div>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="copies_count">Message</Label>
                        <Textarea placeholder="Type your message here." />
                      </div>

                      <Button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 focus:shadow-outline focus:outline-none"
                      >
                        Upload File
                      </Button>
                    </div>
                  </div>
                </div>
              </section>
            </article>
          </main>
        </div>
      </section>
    </section>
  );
};

export default DoKopiFileUpload;
