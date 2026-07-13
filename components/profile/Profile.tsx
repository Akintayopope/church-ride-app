"use client";

import { FormEvent, useState } from "react";

import type { MemberProfile } from "@/lib/types";

type ProfileProps = {
    member: MemberProfile;
    onUpdateMember: (updatedMember: MemberProfile) => void;
};

function getInitials(name: string) {
    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part.charAt(0).toUpperCase())
        .join("");
}

export default function Profile({
    member,
    onUpdateMember,
}: ProfileProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<MemberProfile>(member);
    const [message, setMessage] = useState("");

    function handleEditProfile() {
        setFormData(member);
        setMessage("");
        setIsEditing(true);
    }

    function handleCancelEdit() {
        setFormData(member);
        setMessage("");
        setIsEditing(false);
    }

    function handleChange(
        event: React.ChangeEvent<HTMLInputElement>,
    ) {
        const { name, value } = event.target;

        setFormData((currentFormData) => ({
            ...currentFormData,
            [name]: value,
        }));
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const name = formData.name.trim();
        const phoneNumber = formData.phoneNumber.trim();
        const pickupAddress = formData.pickupAddress.trim();
        const defaultPassengers =
            formData.defaultPassengers.trim();

        if (
            !name ||
            !phoneNumber ||
            !pickupAddress ||
            !defaultPassengers
        ) {
            setMessage("Please complete all required fields.");
            return;
        }

        const updatedMember: MemberProfile = {
            ...member,
            name,
            initials: getInitials(name),
            phoneNumber,
            pickupAddress,
            defaultPassengers,
        };

        onUpdateMember(updatedMember);
        setFormData(updatedMember);
        setMessage("Profile updated successfully.");
        setIsEditing(false);
    }

    return (
        <section className="mt-4 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
            <div className="rounded-2xl bg-white/95 p-6 text-center shadow-xl">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-2xl font-bold text-white shadow">
                    {member.initials}
                </div>

                <h1 className="mt-4 text-2xl font-bold text-slate-800">
                    {member.name}
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    Member Since {member.memberSince}
                </p>

                {!isEditing && (
                    <button
                        type="button"
                        onClick={handleEditProfile}
                        className="mt-6 w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-3 text-sm font-semibold text-white shadow transition hover:scale-[1.01]"
                    >
                        Edit Profile
                    </button>
                )}
            </div>

            <div className="rounded-2xl bg-white/95 p-6 shadow-xl">
                <h2 className="text-xl font-bold text-slate-800">
                    👤 Personal Information
                </h2>

                {message && (
                    <div
                        className={`mt-5 rounded-xl border p-4 text-sm font-medium ${message.includes("successfully")
                                ? "border-green-200 bg-green-50 text-green-800"
                                : "border-red-200 bg-red-50 text-red-700"
                            }`}
                    >
                        {message}
                    </div>
                )}

                {isEditing ? (
                    <form
                        onSubmit={handleSubmit}
                        className="mt-5 space-y-5"
                    >
                        <FormField
                            id="name"
                            label="Full Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />

                        <FormField
                            id="phoneNumber"
                            label="Phone Number"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                        />

                        <FormField
                            id="pickupAddress"
                            label="Pickup Address"
                            name="pickupAddress"
                            value={formData.pickupAddress}
                            onChange={handleChange}
                        />

                        <FormField
                            id="defaultPassengers"
                            label="Default Passengers"
                            name="defaultPassengers"
                            value={formData.defaultPassengers}
                            onChange={handleChange}
                            placeholder="Example: 2 Adults, 1 Child"
                        />

                        <div>
                            <p className="text-sm font-medium text-slate-700">
                                Member Since
                            </p>

                            <div className="mt-2 rounded-xl bg-slate-100 px-4 py-3 text-sm text-slate-500">
                                {member.memberSince}
                            </div>
                        </div>

                        <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row">
                            <button
                                type="button"
                                onClick={handleCancelEdit}
                                className="flex-1 rounded-xl border border-slate-300 px-4 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="flex-1 rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-700"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="mt-5 space-y-4 text-sm">
                        <InfoRow
                            label="Full Name"
                            value={member.name}
                        />

                        <InfoRow
                            label="Phone Number"
                            value={member.phoneNumber}
                        />

                        <InfoRow
                            label="Pickup Address"
                            value={member.pickupAddress}
                        />

                        <InfoRow
                            label="Default Passengers"
                            value={member.defaultPassengers}
                        />

                        <InfoRow
                            label="Member Since"
                            value={member.memberSince}
                        />
                    </div>
                )}
            </div>
        </section>
    );
}

type FormFieldProps = {
    id: string;
    label: string;
    name: keyof MemberProfile;
    value: string;
    placeholder?: string;
    onChange: (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => void;
};

function FormField({
    id,
    label,
    name,
    value,
    placeholder,
    onChange,
}: FormFieldProps) {
    return (
        <div>
            <label
                htmlFor={id}
                className="text-sm font-medium text-slate-700"
            >
                {label}
            </label>

            <input
                id={id}
                name={name}
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
        </div>
    );
}

function InfoRow({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div className="flex flex-col gap-1 border-b border-slate-200 pb-3 sm:flex-row sm:justify-between">
            <span className="text-slate-500">{label}</span>

            <span className="font-medium text-slate-800">
                {value}
            </span>
        </div>
    );
}