/**
 * PreinstallTask.cs
 * 
 * This task executes after OOBE and registers all application background tasks
 * without requiring the application to be run once by the user. It allows for
 * live tiles to be updated as soon as possible after first boot. It does not
 * require task registration.
 * 
 * For details on how to trigger this during development, see README.md.
 * https://docs.microsoft.com/en-us/windows-hardware/customize/preinstall/preinstall-tasks
 */


using System;
using System.Diagnostics;
using Windows.ApplicationModel.Background;
using Windows.Foundation;


namespace MakeArt.BackgroundTasks {
    public sealed class PreinstallTask : IBackgroundTask {
        public async void Run(IBackgroundTaskInstance taskInstance) {
            BackgroundTaskDeferral deferral = taskInstance.GetDeferral();
            Debug.WriteLine("PreinstallTask: Running...");

            try {
                // Register all app background tasks.
                IAsyncOperation<bool> registerTask = TaskManager.RegisterAllBackgroundTasksAsync(false);
                await registerTask;
                
                Debug.WriteLine("PreinstallTask: Finished successfully");
            }
            catch (Exception e) {
                Debug.WriteLine("PreinstallTask: Caught exception: " + e.Message);
            } finally {
                // This must always be called, even if there is an exception.
                deferral.Complete();
            }
        }
    }
}
