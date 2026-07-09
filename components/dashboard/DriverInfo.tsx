export default function DriverInfo() {
    return (
        <div className="mt-4 rounded-xl bg-green-500 p-5 text-white shadow">
            <h4 className="font-bold">🚗 Your Driver</h4>

            <div className="mt-4 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-lg font-bold text-green-600">
                    MJ
                </div>

                <div>
                    <p className="font-bold">Michael Johnson</p>
                    <p className="text-sm">⭐ 4.9 (127 rides)</p>
                    <p className="text-sm">🚙 Toyota Camry · Blue</p>
                    <p className="text-sm">📱 (204) 555-0199</p>
                </div>
            </div>
        </div>
    );
}